import { useProsperFunnel } from "../src/useProsperFunnelNavigation";

function incomeSelect() {
  const {
    // @ts-ignore
    actions: { selectIncome },
  } = useProsperFunnel();

  const selectBigIncome = () => {
    selectIncome(1_000_000);
  };
  const selectSmallIncome = () => {
    selectIncome(10_000);
  };

  return (
    <div style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <div>Income Select Screen</div>
      <div>Do you make a lot of money or just a little?</div>
      <button onClick={selectBigIncome}>I make a lot</button>
      <button onClick={selectSmallIncome}>I make a little</button>
      {/*// <ApplicationSummary />*/}
    </div>
  );
}

export default incomeSelect;
