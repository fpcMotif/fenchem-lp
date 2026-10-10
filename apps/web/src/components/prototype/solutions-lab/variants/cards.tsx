import { AreaChips, LabSection, useSolutionsBrowser } from "../kit";

export function CardsVariant() {
  const browser = useSolutionsBrowser();
  return (
    <LabSection>
      <AreaChips browser={browser} />
      <p>CardsVariant</p>
    </LabSection>
  );
}
