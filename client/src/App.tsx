import { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWSClient, wsLink } from '@trpc/client';
import { trpc } from './utils/trpc';
import TodoList from './components/TodoList';
import { CssVarsProvider, useColorScheme } from '@mui/joy';
import { ModeToggle } from './components/DarkMode';

const wsClient = createWSClient({
  url: `ws://localhost:3001`,
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
        <CssVarsProvider>
          <ModeToggle />
          <TodoList></TodoList>
        </CssVarsProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
