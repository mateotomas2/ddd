import { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWSClient, wsLink } from "@trpc/client";
import { trpc } from "./utils/trpc";
import {
  extendTheme as extendJoyTheme,
  CssVarsProvider,
  CssBaseline,
} from "@mui/joy";

import { deepmerge } from "@mui/utils";
import { experimental_extendTheme as extendMuiTheme } from "@mui/material/styles";
import colors from "@mui/joy/colors";
import { Layout } from "./Layout";

export const muiTheme = extendMuiTheme({
  // This is required to point to `var(--joy-*)` because we are using
  // `CssVarsProvider` from Joy UI.
  cssVarPrefix: "joy",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#FBAB7E",
        },
        secondary: {
          main: "#F7CE68",
        },
        background: {
          default: "#f0f",
          defaultChannel: "#f0f",
          paper: "#f0f",
        },
        grey: colors.grey,
        error: {
          main: colors.red[500],
        },
        info: {
          main: colors.purple[500],
        },
        success: {
          main: colors.green[500],
        },
        warning: {
          main: colors.yellow[200],
        },
        common: {
          white: "#FFF",
          black: "#09090D",
        },
        divider: colors.grey[200],
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: colors.blue[600],
        },
        grey: colors.grey,
        error: {
          main: colors.red[600],
        },
        info: {
          main: colors.purple[600],
        },
        success: {
          main: colors.green[600],
        },
        warning: {
          main: colors.yellow[300],
        },
        common: {
          white: "#FFF",
          black: "#09090D",
        },
        divider: colors.grey[800],
        text: {
          primary: colors.grey[100],
          secondary: colors.grey[300],
        },
      },
    },
  },
});

const joyTheme = extendJoyTheme();

const theme = deepmerge(joyTheme, muiTheme);

const wsClient = createWSClient({
  url: "ws://localhost:3001",
});

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        wsLink({
          client: wsClient,
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />

          <Layout />
        </CssVarsProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
