import "./App.css";
import { useColorScheme } from "@mui/joy";
import { ModeToggle } from "./components/DarkMode";
import TodoListOffline from "./components/TodoList";

import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Theme } from "@mui/material";

import {
  Outlet,
  RouterProvider,
  Link,
  createReactRouter,
  createRouteConfig,
  useMatch,
} from "@tanstack/react-router";
import { Index } from "./pages";
import { About } from "./pages/about";
import { TodoListPage } from "./pages/todoList";

const rootRoute = createRouteConfig({
  component: () => (
    <>
      {/*<div>
        <Link to="/">Home</Link> <Link to="/about">About</Link>
  </div>*/}
      <Outlet />
    </>
  ),
});

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: Index,
});

export const todoListRouter = rootRoute.createRoute({
  path: "$postId",
  component: TodoListPage,
  errorComponent: () => "Oh crap",
});

const aboutRoute = rootRoute.createRoute({
  path: "/about",
  component: About,
});

const routeConfig = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  todoListRouter,
]);

const router = createReactRouter({ routeConfig });

export const Layout = () => {
  const { mode } = useColorScheme();

  return (
    <Background mode={mode}>
      <RouterProvider router={router} />
      <ModeToggle />
      {/*<TodoListOffline></TodoListOffline>*/}
    </Background>
  );
};

const Background = withTheme(styled.div<{
  theme: Theme;
  mode: string | undefined;
}>`
  height: 100%;
  ${({ theme }) => `
        background-color: ${theme.palette.primary.main};
        background-image: linear-gradient(62deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%);
    `}
`);
