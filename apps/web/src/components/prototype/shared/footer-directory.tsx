import * as stylex from "@stylexjs/stylex";
import type { StyleXStyles } from "@stylexjs/stylex";
import type { JSX } from "@solidjs/web";
import { Leaf } from "@fenchem-lp/ui/components/lucide";
import { company, regions } from "@/components/landing/landing-content";
export function FooterDirectory(props: {
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
  divisions: JSX.Element;
}) {
  const styles = props.styles;
  return (
    <div {...stylex.attrs(styles.footerGrid)}>
      <div {...stylex.attrs(styles.footerIntro)}>
        <a href="#top" aria-label="Fenchem home" {...stylex.attrs(styles.brand)}>
          <span {...stylex.attrs(styles.brandWord)}>FENCHEM</span>
          <Leaf aria-hidden="true" strokeWidth={1.5} {...stylex.attrs(styles.brandLeaf)} />
        </a>
        <p {...stylex.attrs(styles.prose)}>{company.tagline}</p>
        <span {...stylex.attrs(styles.techLabel)}>
          {company.since} · {company.hq.city}
        </span>
      </div>
      <div {...stylex.attrs(styles.footerCol)}>
        <h3 {...stylex.attrs(styles.footerHead)}>Divisions</h3>
        <ul {...stylex.attrs(styles.footerList)}>{props.divisions}</ul>
      </div>
      <div {...stylex.attrs(styles.footerCol)}>
        <h3 {...stylex.attrs(styles.footerHead)}>Bases</h3>
        <ul {...stylex.attrs(styles.footerList)}>
          {regions.map((region) => (
            <li {...stylex.attrs(styles.footerItem)}>
              {region.city}
              <span {...stylex.attrs(styles.techLabel)}>{region.short}</span>
            </li>
          ))}
        </ul>
      </div>
      <div {...stylex.attrs(styles.footerCol, styles.footerColLast)}>
        <h3 {...stylex.attrs(styles.footerHead)}>Contact</h3>
        <ul {...stylex.attrs(styles.footerList)}>
          <li>
            <a href={`mailto:${company.email}`} {...stylex.attrs(styles.footerLink)}>
              {company.email}
            </a>
          </li>
          <li {...stylex.attrs(styles.footerItem)}>{company.hq.coords}</li>
        </ul>
      </div>
    </div>
  );
}
