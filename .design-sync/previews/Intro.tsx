import { Intro } from "@fenchem-lp/ui";
import { CaptureStatic, SnapDelayed } from "./_lib/capture-static";

export const HeroHeadline = () => (
  <>
    <CaptureStatic />
    <SnapDelayed />
    <Intro>
      <div style={{ maxWidth: 520 }}>
        <h1
          style={{
            fontFamily: "Newsreader, serif",
            fontSize: 44,
            lineHeight: 1.08,
            color: "#12211a",
            margin: 0,
          }}
        >
          Botanical Intelligence Since 1995
        </h1>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 17,
            lineHeight: 1.5,
            color: "#3f4f45",
            marginTop: 16,
          }}
        >
          Fenchem supplies clinically studied botanical actives to
          formulators across nutrition, cosmetics, and food & beverage.
        </p>
      </div>
    </Intro>
  </>
);

export const StaggeredHero = () => (
  <>
    <CaptureStatic />
    <SnapDelayed />
    <div style={{ maxWidth: 520 }}>
      <Intro delay={0} y={20}>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 12,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#3f8f5f",
            margin: 0,
          }}
        >
          Est. 1995 · Nanjing, China
        </p>
      </Intro>
      <Intro delay={0.15} y={28}>
        <h1
          style={{
            fontFamily: "Newsreader, serif",
            fontSize: 40,
            lineHeight: 1.1,
            color: "#12211a",
            marginTop: 10,
            marginBottom: 0,
          }}
        >
          From Extraction to Formulation
        </h1>
      </Intro>
      <Intro delay={0.3} y={28}>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 15,
            lineHeight: 1.5,
            color: "#3f4f45",
            marginTop: 12,
          }}
        >
          Industrial-scale botanical ingredients backed by three decades of
          research and a global regulatory footprint.
        </p>
      </Intro>
    </div>
  </>
);
