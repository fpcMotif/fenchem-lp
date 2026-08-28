import { Reveal } from "@fenchem-lp/ui";
import { CaptureStatic, SnapDelayed } from "./_lib/capture-static";

export const SectionTitle = () => (
  <>
    <CaptureStatic />
    <SnapDelayed />
    <Reveal>
      <div style={{ maxWidth: 480 }}>
        <h2
          style={{
            fontFamily: "Newsreader, serif",
            fontSize: 32,
            lineHeight: 1.15,
            color: "#1a2e22",
            margin: 0,
          }}
        >
          Botanical Intelligence Since 1995
        </h2>
        <p
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 15,
            lineHeight: 1.5,
            color: "#4a5a4f",
            marginTop: 12,
          }}
        >
          Three decades of extraction science, supplying formulators across nutrition, cosmetics,
          and food & beverage.
        </p>
      </div>
    </Reveal>
  </>
);

export const StaggeredCards = () => (
  <>
    <CaptureStatic />
    <SnapDelayed />
    <div style={{ display: "flex", gap: 16 }}>
      <Reveal delay={0} y={24}>
        <div
          style={{
            border: "1px solid #d8e0da",
            borderRadius: 8,
            padding: 16,
            maxWidth: 220,
          }}
        >
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: "#1a2e22",
              margin: 0,
            }}
          >
            Nutrition
          </h3>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13,
              color: "#5b6a60",
              marginTop: 6,
            }}
          >
            Joint, eye, and cognitive health actives.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.15} y={24}>
        <div
          style={{
            border: "1px solid #d8e0da",
            borderRadius: 8,
            padding: 16,
            maxWidth: 220,
          }}
        >
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: "#1a2e22",
              margin: 0,
            }}
          >
            Cosmetics
          </h3>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13,
              color: "#5b6a60",
              marginTop: 6,
            }}
          >
            Botanical extracts for skin and hair care.
          </p>
        </div>
      </Reveal>
    </div>
  </>
);
