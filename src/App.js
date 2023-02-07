import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { amber, grey, deepOrange, purple } from '@mui/material/colors';
import { ElemTopBar } from './header';
import { ElemContent } from './content';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
      }}
    >
      <ElemTopBar ColorModeContext={ColorModeContext} />
      <ElemContent />


    </Box>
  );
}

export default function ToggleColorMode() {
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
            ? {
              // palette values for light mode
              primary: amber,
              divider: amber[200],
              text: {
                primary: grey[900],
                secondary: grey[800],
              },
            }
            : {
              // palette values for dark mode
              primary: deepOrange,
              divider: deepOrange[700],
              background: {
                default: deepOrange[900],
                paper: deepOrange[900],
              },
              text: {
                primary: '#fff',
                secondary: grey[500],
              },
            }),

        }, // mode final
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}