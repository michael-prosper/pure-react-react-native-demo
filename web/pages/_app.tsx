import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import {
  NavigatorHack,
  ProsperFunnelProvider,
  ProsperRoute,
  ProsperRoutes,
} from "../src/useProsperFunnelNavigation";
import { ApplicationSummary } from "../src/ApplicationSummary";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const n = {
    navigate: (route: string) => router.push("/" + route),
  };

  return (
    <ProsperFunnelProvider
      handleFunnelComplete={(application: any) => {
        alert("Funnel Complete 🎉" + JSON.stringify(application, null, 4));
      }}
      navigateToRoute={(route: ProsperRoute, navigator: NavigatorHack) => {
        // lowercase the first letter of the route
        const routeName = route.charAt(0).toLowerCase() + route.slice(1);
        console.log({ routeName });
        navigator?.navigate(routeName);
      }}
      platformProps={undefined}
      platformNavigator={n}
    >
      <Component {...pageProps} />
      <ApplicationSummary />
    </ProsperFunnelProvider>
  );
}

export default MyApp;
