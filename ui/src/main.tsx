import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ErrorComponent from './components/layout/ErrorComponent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Partners from './pages/Partners';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import { Toaster } from './components/ui/sonner';
import UserProvider from './providers/UserProvider';
import ProtectedRoute from './components/layout/ProtectedRoute';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route path="/" element={<ContactUs />} />
              <Route path="/log-in" element={<Login />} />
              <Route path="/internal" element={<ProtectedRoute />}>
                <Route path="/internal/" element={<Home />} />
                <Route path="/internal/partners" element={<Partners />} />
                <Route path="/internal/admin">
                  <Route path="/internal/admin/" element={<Admin />} />
                </Route>
              </Route>
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
    <Toaster />
  </StrictMode>
);
