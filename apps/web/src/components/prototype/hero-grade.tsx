const HERO_GRADE_MATRIX = [
  "1.2711 -0.0338 -1.2587 0 1.0597",
  "0.1531 0.8306 -0.3648 0 0.4215",
  "0.0005 -0.0005 0.0094 0 0.9908",
  "0 0 0 1 0",
].join(" ");

export function HeroGradeFilter() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <filter id="fenchem-hero-grade" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values={HERO_GRADE_MATRIX} />
      </filter>
    </svg>
  );
}
