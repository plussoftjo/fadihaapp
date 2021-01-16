import React from "react";
import { View, Image } from "react-native";
import { Text } from "@ui-kitten/components";


import {Models,env,colors} from '../../../../constants'
import {translate} from '../../../../translations'
export default () => {
  return (
    <View>
      <View style={{ padding: 20, flexDirection: "row" }}>
        <Text style={{ color: "white" }} category="h1">
          {translate('settings_main.header')}
        </Text>
      </View>
      <View
        style={{
          marginTop: 15,
          width: Models.window.width,
          padding: 15,
          backgroundColor: "rgba(0,0,0,0.1)",
          borderTopColor: "#7e7e7e",
          borderTopWidth: 1,
          borderBottomColor: "#7e7e7e",
          borderBottomWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical:5,
          
        }}
      >
        <View style={{marginHorizontal:10}}>
          <Text category="h5" style={{ color: "white" }}>
            Ahmed
          </Text>
          <Text category="h5" style={{ color: "white" }}>
            0788787487
          </Text>
        </View>
      </View>
    </View>
  )
};
