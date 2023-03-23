import {  View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'

export function Routes() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}