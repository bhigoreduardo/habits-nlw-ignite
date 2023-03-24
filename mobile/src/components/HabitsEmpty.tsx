import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function HabitsEmpty() {
  const { navigate } = useNavigation()

  return (
    <Text className="font-semiBold text-base text-zinc-500">
      Você ainda não possui hábitos cadastrados.&nbsp;
      <Text
        className="text-zinc-400 underline active:text-violet-700"
        onPress={() => navigate('new')}
      >
        Comece cadastrando agora.
      </Text>
    </Text>
  )
}