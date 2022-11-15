import React from 'react';
import {AppRegistry, Text, View, Button, Alert} from 'react-native';
// import * as AndroidBridge from './src/AndroidBridgeHelper';
import {
  ProsperFunnelProvider,
  ProsperRoutes,
  useProsperFunnel,
} from './useProsperFunnelNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigatorHack, ProsperRoute} from './useProsperFunnelNavigation';
import {useNavigation} from '@react-navigation/native';

// @ts-ignore
const Landing = () => {
  const navigation = useNavigation();
  const {
    // @ts-ignore
    // state: {platformProps},
    //   // @ts-ignore
    actions: {startFunnel},
    //   // @ts-ignore
    meta,
  } = useProsperFunnel();
  //

  // @ts-ignore
  meta.cacheNavigator(navigation);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Welcome to the Prosper Landing Page</Text>
      <Button onPress={startFunnel} title="Click here to start a Funnel" />
      <ApplicationSummary/>
      {/*<Button*/}
      {/*  onPress={() => AndroidBridge.openExampleActivityByClosing()}*/}
      {/*  title="Back Button"*/}
      {/*/>*/}
      {/*<Text>This JSON object came from Android Native code</Text>*/}
      {/*<Text>{JSON.stringify(platformProps, null, 2)}</Text>*/}
      {/*<Button*/}
      {/*  onPress={() => AndroidBridge.openExampleActivity()}*/}
      {/*  title="Click to Open Android Native Screen"*/}
      {/*/>*/}
    </View>
  );
};

function IncomeSelectScreen() {
  const {
    // @ts-ignore
    actions: {selectIncome},
  } = useProsperFunnel();

  const selectBigIncome = () => {
    selectIncome(1_000_000);
  };
  const selectSmallIncome = () => {
    selectIncome(10_000);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Income Select Screen</Text>
      <Text>Do you make a lot of money or just a little?</Text>
      <Button onPress={selectBigIncome} title="I make a lot" />
      <Button onPress={selectSmallIncome} title="I make a little" />
      <ApplicationSummary />
    </View>
  );
}

function ApplicationSummary() {
  const {
    state: {application},
    actions: {startOver}
  } = useProsperFunnel();
  return (
    <>
      <Text>Application Summary</Text>
      <Text style={{padding: 8}}>{JSON.stringify(application, null, 4)}</Text>
      <Button onPress={startOver} title="Start Over" />
    </>
  );
}

function FunnelHighIncomeScreen() {
  const {
    state: {application},
    actions: {selectLoanAmount},
  } = useProsperFunnel();

  const selectBigLoan = () => {
    selectLoanAmount(1_000_000);
  };
  const selectSmallLoan = () => {
    selectLoanAmount(10_000);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Loan Amount Select Screen</Text>
      <Text>Congratulations on your wonderful wealth!</Text>
      <Text>How much money do you want to borrow?</Text>
      <Button onPress={selectBigLoan} title="I want a lot" />
      <Button onPress={selectSmallLoan} title="I want a little" />
      <ApplicationSummary />
    </View>
  );
}

function FunnelLowIncomeScreen() {
  const {
    actions: {selectLoanAmount},
  } = useProsperFunnel();

  const selectSmallLoan = () => {
    selectLoanAmount(10_000);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Prosper is here to help you grow your credit and net worth!</Text>
      <Button onPress={selectSmallLoan} title="Thanks Prosper, let's go!" />
      <ApplicationSummary />
    </View>
  );
}

function FunnelAfterIncomeScreen() {
  const {
    actions: {completeFunnel},
  } = useProsperFunnel();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Application is complete! Please review your summary below</Text>
      <ApplicationSummary />
      <Button onPress={completeFunnel} title="Great! Submit Application" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = (props: any) => {
  return (
    <ProsperFunnelProvider
      handleFunnelComplete={application => {
        // AndroidBridge.openExampleActivity();
        Alert.alert('Funnel Complete 🎉', JSON.stringify(application, null, 4));
      }}
      navigateToRoute={(route: ProsperRoute, navigator: NavigatorHack) => {
        navigator?.navigate(route);
      }}
      platformProps={props}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ProsperRoutes.Landing}>
          <Stack.Screen name={ProsperRoutes.Landing} component={Landing} />
          <Stack.Screen
            name={ProsperRoutes.IncomeSelect}
            component={IncomeSelectScreen}
          />
          <Stack.Screen
            name={ProsperRoutes.FunnelHighIncome}
            component={FunnelHighIncomeScreen}
          />
          <Stack.Screen
            name={ProsperRoutes.FunnelLowIncome}
            component={FunnelLowIncomeScreen}
          />
          <Stack.Screen
            name={ProsperRoutes.FunnelAfterIncome}
            component={FunnelAfterIncomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProsperFunnelProvider>
  );
};

export default App;
