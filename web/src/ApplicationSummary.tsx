import { useProsperFunnel } from "./useProsperFunnelNavigation";

export function ApplicationSummary() {
  const {
    state: { application },
    actions: { startOver },
  } = useProsperFunnel();
  return (
    <>
      <div>Application Summary</div>
      <div style={{ padding: 8 }}>{JSON.stringify(application, null, 4)}</div>
      <button onClick={startOver}>Start Over</button>
    </>
  );
}
