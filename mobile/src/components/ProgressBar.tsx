import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

interface IProgressBarProps {
  progress?: number
}

export function ProgressBar({ progress = 0 }: IProgressBarProps) {
  const sharedProgress = useSharedValue(progress)

  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(progress)
  }, [progress]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700">
      <Animated.View className="h-full rounded-xl bg-violet-600" style={style}/>
    </View>
  )
}