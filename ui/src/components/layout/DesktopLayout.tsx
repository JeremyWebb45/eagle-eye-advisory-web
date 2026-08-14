import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import DesktopSidebar from './DesktopSidebar';

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DesktopSidebar />
      <SidebarTrigger className="sticky top-0" />
      <div className="flex flex-1 justify-center">{children}</div>
    </SidebarProvider>
  );
}
