import "./App.css";
import { useColorScheme } from "@mui/joy";
import { ModeToggle } from "./components/DarkMode";
import TodoListOffline from "./components/TodoListOffline";

import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Theme } from "@mui/material";

export const Layout = () => {
  const { mode } = useColorScheme();

  return (
    <Background mode={mode}>
      <ModeToggle />
      <TodoListOffline></TodoListOffline>
    </Background>
  );
};

const Background = withTheme(styled.div<{
  theme: Theme;
  mode: string | undefined;
}>`
  ${({ theme }) => `
        background-color: ${theme.palette.primary.main};
        background-image: linear-gradient(62deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%);
    `}
`);
