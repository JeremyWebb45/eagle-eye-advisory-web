import useIsMobile from '@/hooks/useIsMobile';
import MobileLayout from './MobileLayout';
import { Outlet } from 'react-router-dom';
import DesktopLayout from './DesktopLayout';
import LoadingComponent from './LoadingComponent';
import { Toaster } from '../ui/sonner';

export default function RootLayout() {
  const { isLoading, isMobile } = useIsMobile();

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      {isMobile ? (
        <MobileLayout>
          <Outlet />
        </MobileLayout>
      ) : (
        <DesktopLayout>
          <Outlet />
        </DesktopLayout>
      )}
      <Toaster />
    </>
  );
}
