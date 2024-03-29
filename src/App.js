import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import colors from './colors';
import { ElemTopBar } from './header';
import { ElemContent } from './content';
import ElemFooter from './footer';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
 
/** 18 de maio 2023
 * melhorado o css das lista de outorgas e adicionado alguns tolltips
 */

export default function App() {

  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? colors[1]
            : colors[0]),

        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
          }}
        >
          <ElemTopBar ColorModeContext={ColorModeContext} />
          <ElemContent mode={mode} theme={theme} />
          <ElemFooter/>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

