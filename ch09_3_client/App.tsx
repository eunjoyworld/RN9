import 'react-native-gesture-handler'
import React, {useState, useCallback} from 'react'
import {enableScreens} from 'react-native-screens'
import {SafeAreaProvider} from 'react-native-safe-area-context'
// prettier-ignore
import {NavigationContainer, DefaultTheme, DarkTheme}
from '@react-navigation/native'
import {AppearanceProvider, useColorScheme} from 'react-native-appearance'
import {Provider as ReduxProvider} from 'react-redux'
import {ToggleThemeProvider} from './src/contexts'
import MainNavigator from './src/screens/MainNavigator'
import {makeStore} from './src/store'

enableScreens()

const store = makeStore()

export default function App() {
  const scheme = useColorScheme() // 'dark' 혹은 'light'
  const [theme, setTheme] = useState(
    scheme === 'dark' ? DarkTheme : DefaultTheme
  )
  // prettier-ignore
  const toggleTheme = useCallback(
  () => setTheme(({dark}) => (dark ? DefaultTheme : DarkTheme)),
  [])
  return (
    <AppearanceProvider>
      <ToggleThemeProvider toggleTheme={toggleTheme}>
        <SafeAreaProvider>
          <ReduxProvider store={store}>
            <NavigationContainer theme={theme}>
              <MainNavigator />
            </NavigationContainer>
          </ReduxProvider>
        </SafeAreaProvider>
      </ToggleThemeProvider>
    </AppearanceProvider>
  )
}
