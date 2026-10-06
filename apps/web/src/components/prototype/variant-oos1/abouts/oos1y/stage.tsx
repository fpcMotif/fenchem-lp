import * as stylex from "@stylexjs/stylex";

import { ABOUT_BANNER, ABOUT_CAMPUS, ABOUT_HERO } from "../../about-data";
import { STATS } from "../../content";
import { Reveal } from "./reveal";
import { srOnly, ui } from "./shared";
import { bp, chrome, face, pane, tone } from "./tokens.stylex";

const LAB = ABOUT_CAMPUS.photos.find((photo) => photo.id === "lab") ?? ABOUT_CAMPUS.photos[0];
const NETWORK_LINE = `${ABOUT_HERO.networkLabel}${ABOUT_HERO.countries.join("、")}。`;

const paneOpen = stylex.keyframes({
  "0%": { clipPath: "inset(0% 50% 0% 50%)" },
  "100%": { clipPath: "inset(0% 0% 0% 0%)" },
});

const etchIn = stylex.keyframes({
  "0%": { opacity: 0, transform: "translateY(16px)" },
  "100%": { opacity: 1, transform: "none" },
});

const styles = stylex.create({
  stage: {
    position: "relative",
  },
  pin: {
    position: "sticky",
    top: chrome.total,
    zIndex: 0,
    height: chrome.pin,
    overflow: "hidden",
    backgroundColor: "#a9c6ea",
  },
  exterior: {
    objectPosition: "51% 50%",
  },
  window: {
    position: "absolute",
    overflow: "hidden",
    left: { default: "24%", [bp.tablet]: "33%", [bp.laptop]: "40%", [bp.wide]: "39%" },
    width: { default: "52%", [bp.tablet]: "34%", [bp.laptop]: "20%", [bp.wide]: "22%" },
    top: { default: "7%", [bp.tablet]: "8%", [bp.desktop]: "9%" },
    height: { default: "42%", [bp.tablet]: "46%", [bp.desktop]: "52%" },
    boxShadow: "0 36px 70px -40px rgba(11, 42, 92, 0.55)",
    animationName: { default: paneOpen, [bp.motionReduce]: "none" },
    animationDuration: "900ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 150ms)",
    animationTimingFunction: pane.ease,
    animationFillMode: "both",
  },
  interior: {
    objectPosition: "50% 60%",
  },
  reflection: {
    opacity: 0.16,
    transform: "scaleX(-1)",
    objectPosition: "51% 50%",
  },
  frame: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(112deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.26) 42%, rgba(255, 255, 255, 0) 54%)",
    boxShadow:
      "inset 0 0 0 1px rgba(255, 255, 255, 0.9), inset 0 22px 36px -28px rgba(11, 42, 92, 0.45)",
  },
  flow: {
    position: "relative",
    isolation: "isolate",
    marginTop: chrome.pinLift,
  },
  banner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    boxSizing: "border-box",
    minHeight: chrome.pin,
    paddingBottom: { default: 20, [bp.tablet]: 40, [bp.desktop]: 56 },
    marginBottom: { default: "26svh", [bp.desktop]: "22svh" },
  },
  heroPane: {
    width: { default: "100%", [bp.tablet]: 480, [bp.laptop]: 440, [bp.wide]: 560 },
    padding: { default: "22px 22px 24px", [bp.desktop]: "34px 44px 38px" },
  },
  etchIn: {
    animationName: { default: etchIn, [bp.motionReduce]: "none" },
    animationDuration: "800ms",
    animationDelay: "calc(var(--oo-intro, 0ms) + 260ms)",
    animationTimingFunction: pane.ease,
    animationFillMode: "both",
  },
  crumbs: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  crumbLink: {
    color: { default: "inherit", ":hover": tone.ink },
    textDecoration: "none",
    borderRadius: 1,
  },
  title: {
    marginTop: { default: 14, [bp.desktop]: 18 },
    fontSize: { default: 60, [bp.tablet]: 88, [bp.laptop]: 84, [bp.wide]: 112 },
    lineHeight: 1.04,
    letterSpacing: "0.04em",
  },
  tagline: {
    margin: 0,
    marginTop: { default: 12, [bp.desktop]: 16 },
    fontFamily: face.serif,
    fontStyle: "italic",
    fontSize: { default: 21, [bp.desktop]: 26 },
    lineHeight: 1.25,
    color: tone.ink,
  },
  lead: {
    margin: 0,
    marginTop: { default: 14, [bp.desktop]: 18 },
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.8,
    color: tone.onGlass,
    maxWidth: "30em",
    textWrap: "pretty",
  },
  meta: {
    margin: 0,
    marginTop: { default: 14, [bp.desktop]: 20 },
  },

  profile: {
    paddingBottom: { default: "16svh", [bp.desktop]: "18svh" },
  },
  composition: {
    display: { default: "flex", [bp.desktop]: "grid" },
    flexDirection: "column",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
  },
  namePane: {
    gridArea: "1 / 1 / 2 / 8",
    alignSelf: { default: "stretch", [bp.desktop]: "start" },
    paddingTop: { default: 28, [bp.tablet]: 40, [bp.desktop]: 48 },
    paddingBottom: { default: 30, [bp.tablet]: 44, [bp.desktop]: 52 },
    paddingInlineStart: { default: 22, [bp.tablet]: 40, [bp.desktop]: 56 },
    paddingInlineEnd: { default: 22, [bp.tablet]: 40, [bp.desktop]: "calc(100% / 7 + 32px)" },
  },
  company: {
    fontSize: { default: 26, [bp.tablet]: 34, [bp.laptop]: 32, [bp.wide]: 38 },
    lineHeight: 1.3,
    letterSpacing: "0.02em",
    textWrap: "balance",
  },
  english: {
    margin: 0,
    marginTop: 10,
    fontFamily: face.sans,
    fontSize: 13,
    lineHeight: 1.4,
    letterSpacing: "0.06em",
    color: tone.body,
  },
  profileLead: {
    margin: 0,
    marginTop: { default: 22, [bp.desktop]: 30 },
    fontFamily: face.sans,
    fontSize: { default: 15, [bp.desktop]: 16 },
    lineHeight: 1.95,
    color: tone.onGlass,
    maxWidth: "30em",
    textWrap: "pretty",
  },
  network: {
    margin: 0,
    marginTop: { default: 18, [bp.desktop]: 22 },
    paddingTop: { default: 18, [bp.desktop]: 22 },
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
    fontFamily: face.sans,
    fontSize: 14,
    lineHeight: 1.9,
    color: tone.body,
    maxWidth: "34em",
  },
  lobby: {
    gridArea: "1 / 7 / 2 / 13",
    alignSelf: { default: "stretch", [bp.desktop]: "start" },
    position: "relative",
    zIndex: 1,
    margin: 0,
    marginTop: { default: -20, [bp.desktop]: 104 },
    marginLeft: { default: 20, [bp.tablet]: "26%", [bp.desktop]: 0 },
    aspectRatio: "3 / 2",
    overflow: "hidden",
    borderRadius: 2,
    boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.8), 0 44px 80px -48px rgba(11, 42, 92, 0.6)",
  },
  lobbyTag: {
    position: "absolute",
    left: 12,
    bottom: 12,
    paddingBlock: 6,
    paddingInline: 10,
  },
  statsPane: {
    gridArea: "2 / 8 / 3 / 12",
    position: "relative",
    zIndex: 2,
    marginTop: { default: -20, [bp.desktop]: -96 },
    marginRight: { default: 20, [bp.tablet]: "34%", [bp.desktop]: 0 },
    padding: { default: "8px 24px", [bp.desktop]: "10px 36px" },
  },
  stats: {
    margin: 0,
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    paddingBlock: { default: 18, [bp.desktop]: 22 },
    borderTopWidth: { default: 1, ":first-child": 0 },
    borderTopStyle: "solid",
    borderTopColor: tone.hairline,
  },
  statValue: {
    order: -1,
    margin: 0,
    fontSize: { default: 44, [bp.desktop]: 52 },
    lineHeight: 1,
    letterSpacing: "-0.01em",
    fontVariantNumeric: "tabular-nums",
  },
  statUnit: {
    marginInlineStart: 4,
    fontSize: "0.46em",
    letterSpacing: 0,
  },
  statLabel: {
    margin: 0,
    fontFamily: face.sans,
    fontSize: 14,
    lineHeight: 1.5,
    color: tone.onGlass,
  },
  statCaption: {
    marginInlineStart: 10,
    color: tone.body,
    fontSize: 13,
  },
});

export function Stage({ onNavigateHome }: { onNavigateHome: (hash?: string) => void }) {
  return (
    <div {...stylex.props(styles.stage)}>
      <div {...stylex.props(styles.pin)}>
        <img
          src={ABOUT_BANNER.image}
          alt={ABOUT_BANNER.alt}
          fetchPriority="high"
          decoding="async"
          {...stylex.props(ui.fill, styles.exterior)}
        />
        <div aria-hidden="true" {...stylex.props(styles.window)}>
          <img
            src={LAB.large}
            alt=""
            decoding="async"
            {...stylex.props(ui.fill, styles.interior)}
          />
          <img
            src={ABOUT_BANNER.image}
            alt=""
            decoding="async"
            {...stylex.props(ui.fill, styles.reflection)}
          />
          <span {...stylex.props(styles.frame)} />
        </div>
      </div>

      <div {...stylex.props(styles.flow)}>
        <section aria-labelledby="oos1y-title" {...stylex.props(styles.banner)}>
          <div {...stylex.props(ui.shell)}>
            <div {...stylex.props(ui.glass, styles.heroPane)}>
              <div {...stylex.props(styles.etchIn)}>
                <nav aria-label="面包屑">
                  <ol {...stylex.props(ui.label, styles.crumbs)}>
                    <li>
                      <a
                        href="#top"
                        onClick={(event) => {
                          event.preventDefault();
                          onNavigateHome();
                        }}
                        {...stylex.props(styles.crumbLink)}
                      >
                        <span lang="en">Home</span>
                        <span {...srOnly}> 首页</span>
                      </a>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page">
                      <span lang="en">About</span>
                      <span {...srOnly}> 关于我们</span>
                    </li>
                  </ol>
                </nav>
                <h1 id="oos1y-title" {...stylex.props(ui.etched, styles.title)}>
                  {ABOUT_BANNER.title}
                </h1>
                <p lang="en" {...stylex.props(styles.tagline)}>
                  {ABOUT_BANNER.tagline}
                </p>
                <p {...stylex.props(styles.lead)}>{ABOUT_BANNER.lead}</p>
                <p {...stylex.props(ui.label, styles.meta)}>
                  <span lang="en">{ABOUT_BANNER.established}</span>
                  <span aria-hidden="true"> · </span>
                  <span lang="en">{ABOUT_BANNER.place}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about-profile"
          aria-labelledby="oos1y-profile"
          {...stylex.props(ui.anchor, styles.profile)}
        >
          <h2 id="oos1y-profile" {...srOnly}>
            企业概况
          </h2>
          <div {...stylex.props(ui.shell)}>
            <div {...stylex.props(styles.composition)}>
              <div {...stylex.props(ui.glass, styles.namePane)}>
                <Reveal>
                  <h3 {...stylex.props(ui.etched, styles.company)}>{ABOUT_HERO.title}</h3>
                  <p lang="en" {...stylex.props(styles.english)}>
                    {ABOUT_HERO.englishTitle}
                  </p>
                  <p {...stylex.props(styles.profileLead)}>{ABOUT_HERO.lead}</p>
                  <p {...stylex.props(styles.network)}>{NETWORK_LINE}</p>
                </Reveal>
              </div>

              <figure {...stylex.props(styles.lobby)}>
                <img
                  src={ABOUT_HERO.lobbyImage}
                  alt={ABOUT_HERO.lobbyCaption}
                  loading="lazy"
                  decoding="async"
                  {...stylex.props(ui.fill)}
                />
                <figcaption {...stylex.props(ui.glass, ui.label, styles.lobbyTag)}>
                  <span lang="en">Lobby</span>
                  <span {...srOnly}> {ABOUT_HERO.lobbyCaption}</span>
                </figcaption>
              </figure>

              <div {...stylex.props(ui.glass, styles.statsPane)}>
                <Reveal delay={120}>
                  <dl {...stylex.props(styles.stats)}>
                    {STATS.map((stat) => (
                      <div key={stat.label} {...stylex.props(styles.stat)}>
                        <dt {...stylex.props(styles.statLabel)}>
                          {stat.label}
                          <span {...stylex.props(styles.statCaption)}>{stat.caption}</span>
                        </dt>
                        <dd {...stylex.props(ui.etched, styles.statValue)}>
                          {stat.value}
                          {stat.unit ? (
                            <span {...stylex.props(styles.statUnit)}>{stat.unit}</span>
                          ) : null}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
