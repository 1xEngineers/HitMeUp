import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { THEME, ThemeProvider } from 'native-x-theme'
import { THEMES } from '@hmu-feature/theme'
import { LoginScreen } from '@hmu-screen/login-screen'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <ThemeProvider theme={THEME.LIGHT} themes={THEMES} autoSwitchTheme={false}>
      <SafeAreaView>
        <StatusBar barStyle='dark-content' animated />
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default App
