import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import ErrorComponent from './components/layout/ErrorComponent';
import RSVP from './pages/RSVP';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { prefetchInvites } from './data/useInvites';
import RSVPView from './pages/RSVPView';
import LoadingComponent from './components/layout/LoadingComponent';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorComponent />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/rsvp',
        children: [
          {
            index: true,
            element: <RSVP />,
            hydrateFallbackElement: <LoadingComponent />,
            loader: async () => {
              return await prefetchInvites(queryClient);
            },
          },
          {
            path: '/rsvp/view',
            element: <RSVPView />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
