import type { ReactDoctorConfig } from "react-doctor/api";

export default {
  ignore: {
    overrides: [
      {
        // Shared motion primitives are intentionally co-located in one file.
        // Splitting Reveal/Intro/Eyebrow into three files would add noise with no gain.
        files: ["src/components/prototype/motion.tsx"],
        rules: ["react-doctor/no-multi-comp"],
      },
      {
        files: ["src/components/prototype/variant-oos1/abouts/**"],
        rules: ["react-doctor/duplicate-jsx-subtree"],
      },
      {
        files: [
          "src/components/prototype/contact-dialog-lab/variants/route.tsx",
          "src/components/prototype/solutions-lab/variants/compare.tsx",
        ],
        rules: ["react-doctor/no-giant-component"],
      },
      {
        files: ["src/components/prototype/solutions-lab/variants/compare.tsx"],
        rules: ["react-doctor/no-high-complexity-react-function"],
      },
    ],
  },
} satisfies ReactDoctorConfig;
