import { VStack } from "@/components/ui/vstack";
import { ScreenWrapper } from "@/modules/components";
import { Stack } from "expo-router";
import React from "react";
import { Text } from "react-native";
import Constants from "expo-constants"

export const HomeScreen = () => {
  return (
    <ScreenWrapper>
      <Stack.Screen 
        options={{
            headerShown: false
        }}
      />

      <VStack style={{
        paddingTop: Constants.statusBarHeight
      }}>
        <Text>Home Screen</Text>
      </VStack>
    </ScreenWrapper>
  );
};
