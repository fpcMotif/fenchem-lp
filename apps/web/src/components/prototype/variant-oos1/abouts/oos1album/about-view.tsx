import type { SubPageProps } from "../../index";
import { AboutView } from "../../about-view";

import { CampusCarousel } from "./campus-carousel";

export function AboutOOS1ALBUM(props: SubPageProps) {
  return <AboutView {...props} Carousel={CampusCarousel} />;
}
