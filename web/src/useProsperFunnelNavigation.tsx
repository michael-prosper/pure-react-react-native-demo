// TODO: TypeScript
// TODO: move to library
import React from "react";
import { useRouter } from "next/router";

export const ProsperRoutes = {
  Landing: "Landing",
  // TODO: Encapsulate Funnel in its own navigation object
  /* Declare income */
  IncomeSelect: "IncomeSelect",

  /* Where you go if you have high income */
  FunnelHighIncome: "FunnelHighIncome",
  /* Where you go if you have low income */
  FunnelLowIncome: "FunnelLowIncome",

  /* Where you go after you declare your income to view a summary of your application */
  FunnelAfterIncome: "FunnelAfterIncome",

  /* Where you go after you declare your desired loan amount to specify your desired loan term and complete the funnel */
  FunnelTerminal: "FunnelTerminal",
} as const;

const FunnelActions = {
  start: "start",
  selectIncome: "selectIncome",
  selectLoanAmount: "selectLoanAmount",
  completeFunnel: "completeFunnel",
  startOver: "startOver",
};

export type ProsperRoute = typeof ProsperRoutes[keyof typeof ProsperRoutes];
type FunnelActionKey = typeof FunnelActions[keyof typeof FunnelActions];
type FunnelAction = {
  type: FunnelActionKey;
  payload?: {
    income?: number;
    loanAmount?: number;
    loanTerm?: number;
  };
};

const highIncomeThresheld = 100_000;

type FunnelState = {
  route: ProsperRoute;
  application: ProsperApplicationPartial;
  platformProps: any;
};

// A Type where all of ProsperApplication keys are optional
type ProsperApplicationPartial = {
  [K in keyof ProsperApplication]?: ProsperApplication[K];
};

const INITIAL_STATE: FunnelState = {
  route: ProsperRoutes.Landing,
  application: {},
  platformProps: {},
};

const prosperFunnelReducer = (state = INITIAL_STATE, action: FunnelAction) => {
  switch (action.type) {
    case FunnelActions.start:
      return { ...state, route: ProsperRoutes.IncomeSelect };

    case FunnelActions.selectIncome:
      const income = action?.payload?.income || 0;
      const route =
        income > highIncomeThresheld
          ? ProsperRoutes.FunnelHighIncome
          : ProsperRoutes.FunnelLowIncome;

      return {
        ...state,
        route,
        application: { ...state.application, income },
      };

    case FunnelActions.selectLoanAmount:
      const loanAmount = action?.payload?.loanAmount || 0;
      return {
        ...state,
        route: ProsperRoutes.FunnelTerminal,
        application: { ...state.application, loanAmount },
      };

    case FunnelActions.completeFunnel:
      const loanTerm = action?.payload?.loanTerm || 0;
      return {
        ...state,
        route: ProsperRoutes.FunnelTerminal,
        application: { ...state.application, loanTerm },
      };

    case FunnelActions.startOver:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

export type NavigatorHack = {
  navigate: Navigate;
};
type Navigate = (route: ProsperRoute, navigator?: NavigatorHack) => void;
type HandleFunnelComplete = (application: ProsperApplication) => void;
type ProsperApplication = {
  income: number;
  loanAmount: number;
  loanTerm: number;
};

const useProsperFunnelNavigation = (
  navigateToRoute: Navigate,
  handleFunnelComplete: HandleFunnelComplete,
  platformNavigator?: NavigatorHack
) => {
  const navigator = React.useRef<NavigatorHack | undefined>(platformNavigator);
  const cacheNavigator = (platformNavigator: NavigatorHack) => {
    if (navigator.current) return;

    navigator.current = platformNavigator;
  };
  // get current nextjs url
  // TODO remove this nextjs specific code and abstract to `useCurrentRoute`
  const router = useRouter();
  // const { pathname } = router;
  // const route = pathname.replace("/", "") as ProsperRoute;

  // TODO: Using xstate should help with handling back button
  // Right now this is a hack to force the effect to fire when this count changes
  const [dispatchCount, setDispatchCount] = React.useState(0);

  const [state, dispatchHack] = React.useReducer(
    prosperFunnelReducer,
    INITIAL_STATE
  );
  const dispatch = (args: any) => {
    setDispatchCount((count) => count + 1);
    dispatchHack(args);
  };
  const { route, application } = state;

  React.useEffect(() => {
    if (route === ProsperRoutes.FunnelTerminal) {
      // @ts-ignore
      handleFunnelComplete(application);
      return;
    }

    const { pathname } = router;
    const currentRoute = pathname.replace("/", "") as ProsperRoute;
    console.log({ currentRoute });
    // if (route !== currentRoute && route !== ProsperRoutes.Landing) {
    if (route !== currentRoute) {
      navigateToRoute(route, navigator.current);
    }
  }, [route, dispatchCount]);

  const startFunnel = () => dispatch({ type: FunnelActions.start });
  const selectIncome = (income: number) =>
    dispatch({ type: FunnelActions.selectIncome, payload: { income } });
  const selectLoanAmount = (loanAmount: number) =>
    dispatch({ type: FunnelActions.selectLoanAmount, payload: { loanAmount } });
  const completeFunnel = (loanTerm: number) =>
    dispatch({ type: FunnelActions.completeFunnel, payload: { loanTerm } });
  const startOver = () => dispatch({ type: FunnelActions.startOver });

  return {
    state: { route, application },
    actions: {
      startFunnel,
      selectIncome,
      selectLoanAmount,
      completeFunnel,
      startOver,
    },
    meta: { cacheNavigator },
  };
};

const ProsperFunnelContext = React.createContext({
  state: {},
  actions: {},
  meta: {
    cacheNavigator: (navigator: NavigatorHack) => {
      console.log("cacheNavigator not implemented");
    },
  },
});

export const ProsperFunnelProvider = ({
  // @ts-ignore
  children,
  // @ts-ignore
  navigateToRoute,
  // @ts-ignore
  handleFunnelComplete,
  // @ts-ignore
  platformProps,
  // @ts-ignore
  platformNavigator,
}) => {
  const { state, actions, meta } = useProsperFunnelNavigation(
    navigateToRoute,
    handleFunnelComplete,
    platformNavigator
  );

  return (
    <ProsperFunnelContext.Provider
      value={{ state, actions, meta, platformProps }}
    >
      {children}
    </ProsperFunnelContext.Provider>
  );
};

export const useProsperFunnel = () => {
  const context = React.useContext(ProsperFunnelContext);
  if (context === undefined) {
    throw new Error(
      "useProsperFunnel must be used within a ProsperFunnelProvider"
    );
  }
  return context;
};
