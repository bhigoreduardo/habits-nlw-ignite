import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

export function BackButton() {
  return (
    <TouchableOpacity className="mb-4" activeOpacity={0.7}>
      <Feather name="arrow-left" size={32} color={colors.zinc[400]} />
    </TouchableOpacity>
  )
}