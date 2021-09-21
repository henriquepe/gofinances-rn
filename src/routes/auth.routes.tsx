import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screens/SignIn";

const Stack = createStackNavigator();

function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"SignIn"} component={SignIn} />
    </Stack.Navigator>
  );
}

export default AuthRoutes;
