import { Eyebrow } from "@fenchem-lp/ui";
import { CaptureStatic, SnapDelayed } from "./_lib/capture-static";

export const DefaultAccent = () => (
  <>
    <CaptureStatic />
    <SnapDelayed />
    <div>
      <Eyebrow>Our Divisions</Eyebrow>
      <h2
        style={{
          fontFamily: "Newsreader, serif",
          fontSize: 28,
          lineHeight: 1.2,
          color: "#1a2e22",
          marginTop: 8,
          marginBottom: 0,
        }}
      >
        Nutrition, Cosmetics & Food
      </h2>
    </div>
  </>
);

export const CustomAccent = () => (
  <>
    <CaptureStatic />
    <SnapDelayed />
    <div>
      <Eyebrow accent="text-brand-blue-700">Regulatory & Compliance</Eyebrow>
      <h2
        style={{
          fontFamily: "Newsreader, serif",
          fontSize: 28,
          lineHeight: 1.2,
          color: "#1a2e22",
          marginTop: 8,
          marginBottom: 0,
        }}
      >
        Registered Across 40+ Markets
      </h2>
    </div>
  </>
);
