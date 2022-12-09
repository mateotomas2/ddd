import "./App.css";
import { useColorScheme } from "@mui/joy";
import { ModeToggle } from "./components/DarkMode";
import TodoListOffline from "./components/todolist/TodoList";

import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Theme } from "@mui/material";

import {
  Outlet,
  RouterProvider,
  createReactRouter,
  createRouteConfig,
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
  errorComponent: () => "ERROR",
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
    </Background>
  );
};

const Background = withTheme(styled.div<{
  theme: Theme;
  mode: string | undefined;
}>`
  height: 100%;
`);
