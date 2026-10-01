import * as stylex from "@stylexjs/stylex";

export const INK_FILTER_ID = "oos1e-ink";

const styles = stylex.create({
  defs: {
    position: "absolute",
    width: 0,
    height: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
});

export function InkDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" {...stylex.props(styles.defs)}>
      <defs>
        <filter
          id={INK_FILTER_ID}
          x="-8%"
          y="-8%"
          width="116%"
          height="116%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.045"
            numOctaves="2"
            seed="7"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="3.4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="rough"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="2"
            seed="21"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  6 0 0 0 -1.4"
            result="speck"
          />
          <feComposite in="rough" in2="speck" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
