import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainRouter from "./router/MainRouter";

function App() {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createMuiTheme(prefersDarkMode ?
                // A useful theme editor can be found here: https://bareynol.github.io/mui-theme-creator/#
                // For theming, change colors and parameters here.
                {
                    overrides: {
                        MuiAppBar: {
                            colorPrimary: {
                                backgroundColor: "#171c23",
                                color: "#ffffff"
                            },
                        }
                    },
                    palette: {
                        type: 'dark',
                        primary: {
                            main: '#00e3aa',
                        },
                        secondary: {
                            main: '#ffffff',
                        },
                        background: {
                            default: '#12161b',
                            paper: '#1a1f26',
                        },
                        typography: {
                            fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'],
                        },
                    },
                } :
                {
                    overrides: {
                        MuiAppBar: {
                            colorPrimary: {
                                backgroundColor: "#fff",
                                color: "#12151a"
                            },
                        }
                    },
                    palette: {
                        type: 'light',
                        primary: {
                            main: '#12151a',
                        },
                        secondary: {
                            main: '#0FD296',
                        },
                    },
                }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <MainRouter/>
        </ThemeProvider>
    );
}

export default App;
