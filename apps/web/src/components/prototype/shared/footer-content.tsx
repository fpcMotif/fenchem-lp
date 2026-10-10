import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ReactNode } from "react";

export function FooterNavigation({
  logo,
  columns,
  styles,
}: {
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
    <div {...stylex.props(styles.footerTop)}>
      <img
        src={logo.src}
        alt={logo.alt}
        width={225}
        height={73}
        loading="lazy"
        decoding="async"
        {...stylex.props(styles.footerLogo)}
      />
      <nav aria-label="Footer" {...stylex.props(styles.footerColumns)}>
        {columns.map((column) => (
          <div key={column.heading} {...stylex.props(styles.footerColumn)}>
            <h3 {...stylex.props(styles.footerHeading)}>{column.heading}</h3>
            <ul {...stylex.props(styles.footerLinks)}>
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#top" {...stylex.props(styles.footerLink)}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function FooterLegal({
  copyright,
  children,
  styles,
}: {
  copyright: string;
  children: ReactNode;
  styles: Record<"footerBottom" | "copyright" | "social", StyleXStyles>;
}) {
  return (
    <div {...stylex.props(styles.footerBottom)}>
      <p {...stylex.props(styles.copyright)}>{copyright}</p>
      <div {...stylex.props(styles.social)}>{children}</div>
    </div>
  );
}
