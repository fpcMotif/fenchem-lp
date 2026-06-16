import type { ReactDoctorConfig } from "react-doctor";

export default {
  ignore: {
    overrides: [
      {
        // Shared motion primitives are intentionally co-located in one file.
        // Splitting Reveal/Intro/Eyebrow into three files would add noise with no gain.
        files: ["src/components/prototype/motion.tsx"],
        rules: ["react-doctor/no-multi-comp"],
      },
    ],
  },
} satisfies ReactDoctorConfig;
