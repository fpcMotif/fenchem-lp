# Fenchem Workstation Page Capture & Polish Reference

> **Source URL**: `https://a42c302a6-f65f9ca15e26.3fd49b.workstation.wanwang.xin/`  
> **Captured via**: `bunx agent-browser` + Chrome DevTools Protocol (CDP)  
> **Timestamp**: 2026-09-21

---

## 1. Directory Structure

```text
docs/workstation-capture/
├── README.md                      # This documentation and analysis
├── desktop-viewport-1440x900.png  # Desktop hero viewport capture (1440×900, 2x retina)
├── desktop-fullpage-1440.png      # Complete desktop full-length page screenshot (1440×6138)
├── mobile-viewport-390x844.png    # Mobile hero viewport capture (390×844)
├── mobile-fullpage-390.png        # Mobile full-length page screenshot
├── slices/                        # 1800px vertical slices for design critic reviews
│   ├── slice-01.png               # y: 0 – 1800 (Header, Hero banner, About Fenchem, Advantages)
│   ├── slice-02.png               # y: 1800 – 3600 (Products & 4 Application Sectors)
│   ├── slice-03.png               # y: 3600 – 5400 (Global Offices Map, News & Events Accordion)
│   └── slice-04.png               # y: 5400 – 6138 (CTA Section & Footer)
├── site/                          # 100% Offline-playable local mirror
│   ├── index.html                 # Standalone offline HTML with relative assets
│   ├── favicon.png / favicon-dark.png
│   ├── assets/                    # All 12 JS & CSS bundles (Vite build output)
│   │   ├── index-25pPz5MR.js
│   │   ├── index-2Fe_LgyB.css
│   │   ├── home-page-sr417Htn.js
│   │   ├── home-page-CZ462Oxv.css
│   │   └── ...
│   └── AppUpload/Image/           # All 13 high-res images & AVIF assets (>12MB)
├── rendered.html                  # Full post-hydration rendered DOM from Chrome
├── accessibility-snapshot.txt     # Accessibility DOM tree and element references
└── design-audit.json              # Extracted design tokens, section rects, colors, typography
```

---

## 2. Quick Offline Preview

You can serve and browse the captured page locally without an internet connection:

```bash
# Using bun
bun -e '
const path = require("node:path");
const fs = require("node:fs");
Bun.serve({
  port: 3005,
  fetch(req) {
    let p = new URL(req.url).pathname;
    if (p === "/") p = "/index.html";
    const file = path.join("docs/workstation-capture/site", p);
    return fs.existsSync(file) ? new Response(Bun.file(file)) : new Response("Not Found", { status: 404 });
  }
});
console.log("Serving at http://localhost:3005");
'
```

---

## 3. Page Structure & Content Breakdown

| Section                                      | Height (px) | Key Content & Components                                                                                                                                          |
| -------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Header / Nav**                             | 80px        | Transparent sticky header: Logo, Navigation links (首页, 关于我们, 产品与应用, 研发与生产, 职业发展, 联系我们), AI 搜索 trigger (`⌘Q`), Language selector (`CN`). |
| **Hero Section**                             | ~720px      | Headline: _"链接全球优质原料，打造创新解决方案。"_ Hero background image with overlay, primary CTAs.                                                              |
| **About Fenchem (关于泛成)**                 | ~600px      | Company narrative, positioning, dual-tone card with enterprise imagery.                                                                                           |
| **Why Choose Fenchem (为什么选择泛成)**      | ~800px      | 4 Key pillars with cards: 全球资源整合, 稳定供应保障, 解决方案创新, 长期合作伙伴.                                                                                 |
| **Products & Applications (产品与应用方案)** | ~1400px     | 4 Core business divisions: 人类营养健康 (Human Nutrition), 功能性食品 (Functional Food), 个人护理 (Personal Care), 宠物健康 (Pet Health).                         |
| **Global Presence (全球分公司)**             | ~1100px     | Interactive / visual world map showing hubs across Asia, Europe, North America, Africa, South America.                                                            |
| **News & Exhibitions (新闻资讯)**            | ~700px      | Industry exhibition accordion: In-cosmetics Latin America, IFSCC Congress, Naturally Kiawah, In-cosmetics Global, PCHi.                                           |
| **Cooperation CTA**                          | ~280px      | _"更多合作机会"_ with primary dark action button.                                                                                                                 |
| **Footer**                                   | ~350px      | Deep navy background (`#131B2B`), company links, resources, legal, social icons (LinkedIn, WeChat), copyright notice.                                             |

---

## 4. Extracted Design Tokens

- **Brand Primary Dark**: `#131B2B` (Navy charcoal used for headers, footer, primary buttons, card title bars)
- **Brand Accent Teal / Slate**: `rgb(47, 77, 115)`, `rgb(73, 95, 126)`
- **Background Tones**:
  - Pure White `#FFFFFF`
  - Soft Gray `#F5F5F5` / `rgb(242, 247, 247)`
  - Highlight Tint: `rgb(184, 212, 227)` (CTA section background)
- **Typography Stack**: `"Source Han Sans SC", "Noto Sans CJK SC", 思源黑体, system-ui, sans-serif`
- **Asset Weight**: 13 high-res imagery assets (AVIF + PNG), 2 core CSS stylesheets (197KB total CSS), 12 JS modules.
