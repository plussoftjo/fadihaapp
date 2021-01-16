import React from "react";


/** Navigation Components */
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";


/** Screens */
import {Main,PostCreator} from '../containers'
import BottomTapNavigation from './BottomTapNavigation'


/** Stack Creator */
const Stack = createStackNavigator();

// ------- Constants -------//
import {Animations} from '../constants'

/** Render() */
export default function MainNavigation(props) {
  return (
    <Stack.Navigator
      screenOptions={Animations.screenOptions}
      headerMode="float"
      animation="fade"
      initialRouteName={"BottomTapNavigation"}
    >
     <Stack.Screen name="BottomTapNavigation" component={BottomTapNavigation} />
     <Stack.Screen name="PostCreator" component={PostCreator} />
    </Stack.Navigator>
  );
}
