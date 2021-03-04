import * as React from 'react';
import {
  Button, TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/homeScreen';
import Details from './src/screens/detailsScreen';
import Headerscreen from './src/screens/headerscreen'
import Icon from 'react-native-vector-icons/AntDesign';


const Stack = createStackNavigator();

function App() {
  
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{
              headerRight: () => (
                
                <Headerscreen/>
              )
            }}
          />
          <Stack.Screen 
            name="Cart" 
            component={Details}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
