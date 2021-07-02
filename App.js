import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import store from "./src/store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Home from "./src/screens/Home";
import Detail from "./src/screens/Detail";
import Company from "./src/screens/Company";
import Cart from "./src/screens/Cart";
import Grand from "./src/screens/Grand";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Profile from "./src/screens/Profile";
import Success from "./src/screens/Success";

const Stack = createStackNavigator();
const App = () => {
  React.useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Company" component={Company} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Grand" component={Grand} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Success" component={Success} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
