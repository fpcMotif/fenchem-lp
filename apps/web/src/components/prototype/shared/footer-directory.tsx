import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { ReactNode } from "react";
import { Leaf } from "lucide-react";
import { company, regions } from "@/components/landing/landing-content";
export function FooterDirectory({
  styles,
  divisions,
}: {
  styles: Record<
    | "footerGrid"
    | "footerIntro"
    | "brand"
    | "brandWord"
    | "brandLeaf"
    | "prose"
    | "techLabel"
    | "footerCol"
    | "footerHead"
    | "footerList"
    | "footerItem"
    | "footerColLast"
    | "footerLink",
    StyleXStyles
  >;
  divisions: ReactNode;
}) {
  return (
    <div {...stylex.props(styles.footerGrid)}>
      <div {...stylex.props(styles.footerIntro)}>
        <a href="#top" aria-label="Fenchem home" {...stylex.props(styles.brand)}>
          <span {...stylex.props(styles.brandWord)}>FENCHEM</span>
          <Leaf aria-hidden strokeWidth={1.5} {...stylex.props(styles.brandLeaf)} />
        </a>
        <p {...stylex.props(styles.prose)}>{company.tagline}</p>
        <span {...stylex.props(styles.techLabel)}>
          {company.since} · {company.hq.city}
        </span>
      </div>
      <div {...stylex.props(styles.footerCol)}>
        <h3 {...stylex.props(styles.footerHead)}>Divisions</h3>
        <ul {...stylex.props(styles.footerList)}>{divisions}</ul>
      </div>
      <div {...stylex.props(styles.footerCol)}>
        <h3 {...stylex.props(styles.footerHead)}>Bases</h3>
        <ul {...stylex.props(styles.footerList)}>
          {regions.map((region) => (
            <li key={region.city} {...stylex.props(styles.footerItem)}>
              {region.city}
              <span {...stylex.props(styles.techLabel)}>{region.short}</span>
            </li>
          ))}
        </ul>
      </div>
      <div {...stylex.props(styles.footerCol, styles.footerColLast)}>
        <h3 {...stylex.props(styles.footerHead)}>Contact</h3>
        <ul {...stylex.props(styles.footerList)}>
          <li>
            <a href={`mailto:${company.email}`} {...stylex.props(styles.footerLink)}>
              {company.email}
            </a>
          </li>
          <li {...stylex.props(styles.footerItem)}>{company.hq.coords}</li>
        </ul>
      </div>
    </div>
  );
}
