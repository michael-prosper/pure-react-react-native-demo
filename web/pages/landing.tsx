// @ts-ignore
import { useProsperFunnel } from "../src/useProsperFunnelNavigation";

const landing = () => {
  const {
    actions: { startFunnel },
  } = useProsperFunnel();

  return (
    <div style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <div>Welcome to the Prosper Landing Page</div>
      <button onClick={startFunnel} title="">
        Click here to start a Funnel
      </button>
    </div>
  );
};

export default landing;
