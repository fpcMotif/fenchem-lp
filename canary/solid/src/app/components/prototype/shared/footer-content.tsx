import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { For } from "solid-js";
import type { JSX } from "@solidjs/web";

export function FooterNavigation(props: {
  logo: { src: string; alt: string };
  columns: readonly { heading: string; links: readonly string[] }[];
  styles: Record<
    | "footerTop"
    | "footerLogo"
    | "footerColumns"
    | "footerColumn"
    | "footerHeading"
    | "footerLinks"
    | "footerLink",
    StyleXStyles
  >;
}) {
  return (
    <div {...stylex.attrs(props.styles.footerTop)}>
      <img
        src={props.logo.src}
        alt={props.logo.alt}
        width={225}
        height={73}
        loading="lazy"
        decoding="async"
        {...stylex.attrs(props.styles.footerLogo)}
      />
      <nav aria-label="Footer" {...stylex.attrs(props.styles.footerColumns)}>
        <For each={props.columns}>
          {(column) => (
            <div {...stylex.attrs(props.styles.footerColumn)}>
              <h3 {...stylex.attrs(props.styles.footerHeading)}>{column.heading}</h3>
              <ul {...stylex.attrs(props.styles.footerLinks)}>
                <For each={column.links}>
                  {(link) => (
                    <li>
                      <a href="#top" {...stylex.attrs(props.styles.footerLink)}>
                        {link}
                      </a>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          )}
        </For>
      </nav>
    </div>
  );
}

export function FooterLegal(props: {
  copyright: string;
  children: JSX.Element;
  styles: Record<"footerBottom" | "copyright" | "social", StyleXStyles>;
}) {
  return (
    <div {...stylex.attrs(props.styles.footerBottom)}>
      <p {...stylex.attrs(props.styles.copyright)}>{props.copyright}</p>
      <div {...stylex.attrs(props.styles.social)}>{props.children}</div>
    </div>
  );
}
