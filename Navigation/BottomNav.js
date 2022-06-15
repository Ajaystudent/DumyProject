
import { NavigationContainer } from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from '../src/Home';
import Data from '../src/Data';


const Tab = createBottomTabNavigator();
 
const BottomNav=()=> {
  return (
    <NavigationContainer>
      <Tab.Navigator>
 
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Data" component={Data} />
 
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomNav;
