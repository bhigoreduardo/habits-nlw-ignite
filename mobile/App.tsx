import { StatusBar } from 'react-native';

import { Routes } from './src/routes'

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#09090A',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     color: '#fff',
//     fontFamily: 'Inter_800ExtraBold',
//   }
// });
