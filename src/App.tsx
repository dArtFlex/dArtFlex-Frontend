import React, { useState } from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Provider as StoreProvider } from 'react-redux'
import { theme, lightPalette, DarkPalette } from './theme'
import { DataProvider } from 'core/DataProvider'
import configureStore from './stores'
import MainNavigation from './navigation'

const store = configureStore()

const LIGHT = 'light'
const DARK = 'dark'

function App() {
  const [themeType, setTheme] = useState(LIGHT)
  const toggleTheme = () => {
    setTheme(themeType === LIGHT ? DARK : LIGHT)
  }
  return (
    <StoreProvider store={store}>
      <MuiThemeProvider
        theme={createMuiTheme({
          /*@ts-ignore*/
          palette: themeType === LIGHT ? lightPalette : DarkPalette,
          ...theme,
        })}
      >
        <DataProvider>
          <MainNavigation toggleTheme={toggleTheme} />
        </DataProvider>
      </MuiThemeProvider>
    </StoreProvider>
  )
}

export default App
