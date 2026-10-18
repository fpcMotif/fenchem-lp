// Sub-views outside the canary slice.
type SubPageProps = { onNavigateHome: (hash?: string) => void };
function OutOfSlice(props: SubPageProps) {
  return (
    <section style={{ padding: "160px 24px", "text-align": "center" }}>
      <p>This view is outside the canary slice.</p>
      <button type="button" onClick={() => props.onNavigateHome("top")}>
        Back to home
      </button>
    </section>
  );
}
export const AboutView = OutOfSlice;
export const ContactView = OutOfSlice;
export const InsightsView = OutOfSlice;
export const NewsView = OutOfSlice;
export const RdView = OutOfSlice;
