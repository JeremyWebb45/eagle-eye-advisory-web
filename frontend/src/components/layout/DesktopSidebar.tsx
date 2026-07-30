import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { getNavItems } from '@/lib/consts';
import { Separator } from '../ui/separator';
import { Link } from 'react-router-dom';

export default function DesktopSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center">
        <Link to="/" className="flex gap-2 items-center">
          <img src="/logo.png" alt="Logo" width={64} />
          <div className="flex flex-col italic text-[10px]">
            <p>Independent insight.</p>
            <p>Operational clarity.</p>
            <p>Strategic execution.</p>
          </div>
        </Link>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>PAGES</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col">
              {getNavItems().map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to}>
                      {item.icon}
                      <span className="font-bold">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
