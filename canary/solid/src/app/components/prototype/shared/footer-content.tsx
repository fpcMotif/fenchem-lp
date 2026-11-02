import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import { For, type JSX } from "solid-js";

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
    <div {...stylex.props(props.styles.footerTop)}>
      <img
        src={props.logo.src}
        alt={props.logo.alt}
        width={225}
        height={73}
        loading="lazy"
        decoding="async"
        {...stylex.props(props.styles.footerLogo)}
      />
      <nav aria-label="Footer" {...stylex.props(props.styles.footerColumns)}>
        <For each={props.columns}>
          {(column) => (
            <div {...stylex.props(props.styles.footerColumn)}>
              <h3 {...stylex.props(props.styles.footerHeading)}>{column.heading}</h3>
              <ul {...stylex.props(props.styles.footerLinks)}>
                <For each={column.links}>
                  {(link) => (
                    <li>
                      <a href="#top" {...stylex.props(props.styles.footerLink)}>
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
    <div {...stylex.props(props.styles.footerBottom)}>
      <p {...stylex.props(props.styles.copyright)}>{props.copyright}</p>
      <div {...stylex.props(props.styles.social)}>{props.children}</div>
    </div>
  );
}
