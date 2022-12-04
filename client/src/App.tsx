import { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWSClient, wsLink } from '@trpc/client';
import { trpc } from './utils/trpc';
import TodoList from './components/TodoList';

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
        <TodoList></TodoList>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
