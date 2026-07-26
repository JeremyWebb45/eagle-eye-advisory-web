import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import DesktopSidebar from './DesktopSidebar'

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DesktopSidebar />
      <div className="flex flex-1">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  )
}
