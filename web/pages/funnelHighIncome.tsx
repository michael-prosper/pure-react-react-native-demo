import { useProsperFunnel } from "../src/useProsperFunnelNavigation";

function funnelHighIncome() {
  const {
    actions: { selectLoanAmount },
  } = useProsperFunnel();

  const selectBigLoan = () => {
    selectLoanAmount(1_000_000);
  };
  const selectSmallLoan = () => {
    selectLoanAmount(10_000);
  };

  return (
    <div style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <div>Loan Amount Select Screen</div>
      <div>Congratulations on your wonderful wealth!</div>
      <div>How much money do you want to borrow?</div>
      <button onClick={selectBigLoan} title="I want a lot">
        I want a lot
      </button>
      <button onClick={selectSmallLoan} title="I want a little">
        I want a little
      </button>
      {/*<ApplicationSummary />*/}
    </div>
  );
}

export default funnelHighIncome;
