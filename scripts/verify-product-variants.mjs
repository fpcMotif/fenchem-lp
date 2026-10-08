import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const letters = process.argv[2] || "abcdefghijklmnopqrst";
const origin = process.argv[3] || "https://fenchem.localhost";
const output = resolve(process.argv[4] || "/tmp/fenchem-agent-browser-review");
const session = `fenchem-products-${letters}`;
mkdirSync(output, { recursive: true });

async function ab(...args) {
  console.error(args[0], args[0] === "eval" ? "DOM check" : args.slice(1).join(" ").slice(0, 120));
  const child = Bun.spawn(
    ["bunx", "agent-browser", "--session", session, "--ignore-https-errors", ...args, "--json"],
    { stdout: "pipe", stderr: "pipe" },
  );
  const [stdout, stderr, status] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ]);
  const response = JSON.parse(stdout);
  if (status !== 0 || !response.success)
    throw new Error(`${args.join(" ")}: ${response.error || stderr}`);
  return response.data;
}

async function evaluate(code) {
  return (await ab("eval", code)).result;
}

async function snapshot(path, scope) {
  const data = await ab("snapshot", "-i", "-s", scope);
  writeFileSync(path, JSON.stringify(data, null, 2));
  return data;
}

const domHelpers = `
 const visible = e => e.checkVisibility() && !e.closest('[inert]');
 const path = e => {
   if (e.id) return '#' + CSS.escape(e.id);
   const parent = e.parentElement;
   if (!parent) throw new Error('Detached control');
   return path(parent) + ' > ' + e.tagName.toLowerCase() + ':nth-child(' + ([...parent.children].indexOf(e) + 1) + ')';
 };
`;

async function control(scope, query) {
  return await evaluate(
    `(() => { ${domHelpers} const root=document.querySelector(${JSON.stringify(scope)}); ${query} })()`,
  );
}

async function overflow(width) {
  const dimensions = await evaluate(
    "({viewport:innerWidth,document:document.documentElement.scrollWidth})",
  );
  assert.equal(dimensions.viewport, width);
  assert.ok(dimensions.document <= width, `Page overflow: ${JSON.stringify(dimensions)}`);
  return dimensions;
}

const titles = ["滋润清洁泥膜", "植物精粹身体乳", "SPF50 高倍防晒霜"];
const results = [];
try {
  for (const letter of letters) {
    const key = `oos1p${letter}`;
    const result = { key, views: [], errors: [] };
    results.push(result);
    try {
      for (const width of [1440, 375, 768]) {
        const prefix = `${output}/${key}-${width}`;
        await ab("set", "viewport", String(width), width === 375 ? "812" : "1000");
        await ab("set", "media", "light", "reduced-motion");
        await ab("open", `${origin}/?variant=${key}`);
        await ab("wait", "#products-catalog table");
        await ab("wait", "#products-solutions");
        await ab(
          "wait",
          "--fn",
          "[...document.querySelectorAll('#products-solutions button, #products-solutions select')].some(e => Object.keys(e).some(key => key.startsWith('__reactProps')))",
        );
        await evaluate("document.fonts.ready.then(() => true)");
        await snapshot(`${prefix}-initial.json`, "#products-catalog");
        assert.ok(
          await evaluate(
            "document.querySelector('#products-catalog').innerText.includes('产品目录') && document.querySelector('#products-solutions').innerText.includes('应用方案')",
          ),
        );
        for (const section of ["catalog", "solutions"]) {
          await evaluate(
            `window.scrollTo({top: document.querySelector("#products-${section}").getBoundingClientRect().top + scrollY - 80, behavior: "instant"})`,
          );
          await overflow(width);
          await ab("screenshot", `${prefix}-${section}.png`);
        }
        if (["e", "k"].includes(letter) && width < 1024) {
          assert.equal(
            await evaluate(
              "getComputedStyle(document.querySelector('#products-solutions [role=tablist]')).top",
            ),
            "0px",
            "Mobile tabs overlap the sheet",
          );
        }
        if (letter === "j" && width >= 768) {
          const widths = await evaluate(
            "[...document.querySelectorAll('#products-solutions select')].filter(e=>e.checkVisibility()).map(e=>e.getBoundingClientRect().width)",
          );
          assert.equal(widths.length, 2);
          assert.ok(
            widths.every((value) => value > 250),
            "Comparison sheet collapsed to a narrow column",
          );
          assert.ok(Math.abs(widths[0] - widths[1]) < 2, "Comparison sheets have unequal widths");
        }
        const catalogControl = await control(
          "#products-catalog",
          `
          const input = [...root.querySelectorAll('input')].find(e => visible(e) && e.type !== 'checkbox');
          if(input) return {kind:'search',selector:path(input)};
          const select = [...root.querySelectorAll('select')].find(visible);
          if(select) return {kind:'select',selector:path(select),value:select.options[1].value};
          const check = [...root.querySelectorAll('input[type=checkbox]')].find(visible);
          if(check) return {kind:'check',selector:path(check)};
          const buttons = [...root.querySelectorAll('button,a')].filter(e=>visible(e)&&!e.disabled);
          const button=buttons[Math.min(1,buttons.length-1)];
          return button ? {kind:'click',selector:path(button)} : {kind:'static'};
        `,
        );
        if (catalogControl.kind === "search") {
          await ab("fill", catalogControl.selector, "zz-no-matching-product-zz");
          await snapshot(`${prefix}-empty.json`, "#products-catalog");
          assert.ok(
            await evaluate(
              "/没有|未找到|无匹配/.test(document.querySelector('#products-catalog').innerText)",
            ),
            "Missing empty search state",
          );
          const clear = await control(
            "#products-catalog",
            `const e=[...root.querySelectorAll('button')].find(e=>visible(e)&&e.textContent.trim()==='清除筛选');return e?path(e):null;`,
          );
          assert.ok(clear, "Missing clear filters control");
          await ab("click", clear);
          await ab(
            "wait",
            "--fn",
            "document.querySelector('#products-catalog').innerText.includes('42 / 42')",
          );
        } else if (catalogControl.kind === "select")
          await ab("select", catalogControl.selector, catalogControl.value);
        else if (catalogControl.kind === "check") await ab("check", catalogControl.selector);
        else if (catalogControl.kind === "click") await ab("click", catalogControl.selector);
        await snapshot(`${prefix}-catalog-interaction.json`, "#products-catalog");
        await overflow(width);

        const selected = [];
        for (const title of titles) {
          const target = await control(
            "#products-solutions",
            `
            const expand=[...root.querySelectorAll('button[aria-expanded="false"]')].find(e=>visible(e)&&(e.textContent.trim().startsWith('全部方案')||${letter === "l"}));
            if(expand) return {kind:'expand',selector:path(expand)};
            const select=[...root.querySelectorAll('select')].find(visible);
            if(select) {
              const option=[...select.options].find(e=>e.textContent.includes(${JSON.stringify(title)})&&!e.disabled);
              if(option) return {kind:'select',selector:path(select),value:option.value};
            }
            const elements=[...root.querySelectorAll('button,a')].filter(visible);
            const button=elements.find(e=>(e.getAttribute('aria-label')||e.textContent).includes(${JSON.stringify(title)}));
            if(button) return {kind:'click',selector:path(button)};
            return null;
          `,
          );
          assert.ok(target, `No solution control for ${title}`);
          if (target.kind === "expand") {
            await ab("click", target.selector);
            await snapshot(`${prefix}-expanded.json`, "#products-solutions");
            const expanded = await control(
              "#products-solutions",
              `const e=[...root.querySelectorAll('button,a')].find(e=>visible(e)&&(e.getAttribute('aria-label')||e.textContent).includes(${JSON.stringify(title)}));return e?path(e):null;`,
            );
            assert.ok(expanded, `Missing expanded solution ${title}`);
            await ab("click", expanded);
          } else if (target.kind === "select") await ab("select", target.selector, target.value);
          else {
            await ab("scrollintoview", target.selector);
            const state = await snapshot(`${prefix}-before-select.json`, "#products-solutions");
            const ref = Object.entries(state.refs).find(
              ([, value]) =>
                ["tab", "button", "link"].includes(value.role) && value.name.includes(title),
            );
            assert.ok(ref, `Missing snapshot control for ${title}`);
            await ab("click", `@${ref[0]}`);
          }
          const headingCheck = `(() => {const root=document.querySelector('dialog[open]')||document.querySelector('#products-solutions');return [...root.querySelectorAll('h3,h4')].some(e=>e.checkVisibility() && e.textContent.replace(/\\s/g,'').includes(${JSON.stringify(title.replace(/\s/g, ""))}));})()`;
          await ab("wait", "--fn", headingCheck);
          await snapshot(`${prefix}-solution-${selected.length}.json`, "#products-solutions");
          assert.ok(
            await evaluate(
              "(document.querySelector('dialog[open]')||document.querySelector('#products-solutions')).innerText.length > 150",
            ),
            "Empty sheet",
          );
          await overflow(width);
          if (selected.length === 1) await ab("screenshot", `${prefix}-selected-sheet.png`);
          selected.push(title);
          if (await evaluate("Boolean(document.querySelector('dialog[open]'))")) {
            await ab("find", "role", "button", "click", "--name", "关闭");
            await ab("wait", "--fn", "!document.querySelector('dialog[open]')");
          }
          if (letter === "n") await ab("find", "role", "button", "click", "--name", "返回总览");
          await snapshot(`${prefix}-after-close.json`, "#products-solutions");
        }
        const errors = (await ab("errors")).errors;
        assert.deepEqual(errors, [], "Browser errors");
        const consoleErrors = (await ab("console")).messages.filter(
          (message) => message.type === "error",
        );
        assert.deepEqual(consoleErrors, [], "Console errors");
        result.views.push({
          width,
          selected,
          catalogControl: catalogControl.kind,
          ...(await overflow(width)),
        });
      }
      if (letter === "b") {
        await ab("open", `${origin}/?variant=${key}`);
        await ab(
          "wait",
          "--fn",
          "[...document.querySelectorAll('#products-catalog button')].some(e => Object.keys(e).some(key => key.startsWith('__reactProps')))",
        );
        assert.equal(
          await evaluate(
            "document.querySelectorAll('#products-catalog tbody button[aria-expanded]').length",
          ),
          42,
        );
        await ab("find", "role", "button", "click", "--name", "抗氧化", "--exact");
        await snapshot(`${output}/${key}-filter-regression.json`, "#products-catalog");
        assert.equal(
          await evaluate(
            "document.querySelectorAll('#products-catalog tbody button[aria-expanded]').length",
          ),
          7,
        );
        await ab("find", "role", "button", "click", "--name", "清除", "--exact");
        await snapshot(`${output}/${key}-filter-cleared.json`, "#products-catalog");
        assert.equal(
          await evaluate(
            "document.querySelectorAll('#products-catalog tbody button[aria-expanded]').length",
          ),
          42,
        );
        result.filterRegression = "42 → 7 → 42 rows";
      }
      if (letter === "g") {
        await ab("set", "viewport", "375", "812");
        await ab("open", `${origin}/?variant=${key}`);
        await ab(
          "wait",
          "--fn",
          `document.querySelector('[data-item-id="brazil-02"]')?.hasAttribute('aria-expanded') && Object.keys(document.querySelector('[data-item-id="brazil-02"]')).some(key=>key.startsWith('__reactProps'))`,
        );
        await ab("click", '[data-item-id="brazil-02"]');
        await snapshot(`${output}/${key}-selection-phone.json`, "#products-catalog");
        assert.equal(
          await evaluate(
            `document.querySelector('[data-item-id="brazil-02"]').getAttribute('aria-expanded')`,
          ),
          "true",
        );
        await ab("set", "viewport", "1440", "1000");
        await ab(
          "wait",
          "--fn",
          `document.querySelector('[data-item-id="brazil-02"]').getAttribute('aria-pressed') === 'true'`,
        );
        await snapshot(`${output}/${key}-selection-desktop.json`, "#products-catalog");
        assert.equal(
          await evaluate(
            `document.querySelector('[data-item-id="brazil-02"]').getAttribute('aria-pressed')`,
          ),
          "true",
        );
        await ab("set", "viewport", "375", "812");
        await ab(
          "wait",
          "--fn",
          `document.querySelector('[data-item-id="brazil-02"]').getAttribute('aria-expanded') === 'true'`,
        );
        await snapshot(`${output}/${key}-selection-restored.json`, "#products-catalog");
        assert.equal(
          await evaluate(
            `document.querySelector('[data-item-id="brazil-02"]').getAttribute('aria-expanded')`,
          ),
          "true",
        );
        result.selectionRegression = "Preserved at 375 → 1440 → 375";
      }
    } catch (error) {
      result.errors.push(String(error));
      result.failure = await evaluate(
        "({url:location.href,title:document.title,text:document.body.innerText.slice(0,600)})",
      );
      await ab("screenshot", `${output}/${key}-failure.png`);
    }
    writeFileSync(`${output}/results-${letters}.json`, JSON.stringify(results, null, 2));
    console.log(JSON.stringify(result));
  }
} finally {
  await ab("close");
}
process.exitCode = results.some((result) => result.errors.length) ? 1 : 0;
