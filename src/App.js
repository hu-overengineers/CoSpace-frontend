import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeRoutes from "./route/HomePageRoutes";
import {ThemeOptions} from "@material-ui/core/styles";

function App() {

    const prefersDarkMode = true//useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createMuiTheme(prefersDarkMode ?
                // A useful theme editor can be found here: https://bareynol.github.io/mui-theme-creator/#
                // For theming, change colors and parameters here.
                {
                    palette: {
                        type: 'dark',
                        primary: {
                            main: '#12151a',
                        },
                        secondary: {
                            main: '#0FD296',
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
            <HomeRoutes/>
        </ThemeProvider>
    );
}

export default App;
