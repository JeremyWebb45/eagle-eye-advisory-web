import useIsMobile from '@/hooks/useIsMobile';
import { useRouteHead } from '@/hooks/useRouteHead';
import MobileLayout from './MobileLayout';
import { Outlet } from 'react-router-dom';
import DesktopLayout from './DesktopLayout';
import LoadingComponent from './LoadingComponent';
import { Toaster } from '../ui/sonner';

export default function RootLayout() {
  const { isLoading, isMobile } = useIsMobile();
  useRouteHead();

  if (isLoading) {
    return <LoadingComponent />;
  }

  const content = (
    <div className="flex w-full flex-col flex-1 relative max-w-5xl">
      <div className="p-4 flex flex-col gap-4 text-(--primary-dark-blue)">
        <Outlet />
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <MobileLayout>{content}</MobileLayout>
      ) : (
        <DesktopLayout>{content}</DesktopLayout>
      )}
      <Toaster />
      <div className="fixed w-full h-full justify-center items-center flex opacity-15 -z-10">
        <img src="/Logo_w_name.png" alt="Logo" className="w-60 lg:w-80" />
      </div>
    </>
  );
}
