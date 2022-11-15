import { useProsperFunnel } from "../src/useProsperFunnelNavigation";

function funnelLowIncome() {
  const {
    actions: { selectLoanAmount },
  } = useProsperFunnel();

  const selectSmallLoan = () => {
    selectLoanAmount(10_000);
  };

  return (
    <div style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <div>Prosper is here to help you grow your credit and net worth!</div>
      <button onClick={selectSmallLoan}>Thanks Prosper, let's go!</button>
    </div>
  );
}

export default funnelLowIncome;
