import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard, PriceList, PriceDetail } from './pages';
import { getStorage } from './utils';
import { authentication } from './services';


const Stack = createStackNavigator();

const App = () => {

  React.useEffect(() => {
    authentication()
  }, [])

  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="PriceList" component={PriceList} />
          <Stack.Screen name="PriceDetail" component={PriceDetail} initialParams={{}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  )
}





export default registerRootComponent(App);