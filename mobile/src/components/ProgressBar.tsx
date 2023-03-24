import { View } from 'react-native'

export function ProgressBar() {
  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700">
      <View className="h-full rounded-xl bg-violet-600" style={{ width: '75%' }}></View>
    </View>
  )
}