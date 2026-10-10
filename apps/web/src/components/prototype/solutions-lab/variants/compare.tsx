import { AreaChips, LabSection, useSolutionsBrowser } from "../kit";

export function CompareVariant() {
  const browser = useSolutionsBrowser();
  return (
    <LabSection>
      <AreaChips browser={browser} />
      <p>CompareVariant</p>
    </LabSection>
  );
}
