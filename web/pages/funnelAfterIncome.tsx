import { useProsperFunnel } from "../src/useProsperFunnelNavigation";

function funnelAfterIncome() {
  const {
    actions: { completeFunnel },
  } = useProsperFunnel();

  return (
    <div style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <div>Application is complete! Please review your summary below</div>
      {/*<ApplicationSummary />*/}
      <button onClick={completeFunnel}>Great! Submit Application</button>
    </div>
  );
}

export default funnelAfterIncome;
