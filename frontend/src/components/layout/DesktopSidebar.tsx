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
    <Sidebar className="bg-(--primary-green)">
      <SidebarHeader className="flex flex-row items-center bg-(--primary-green)">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" width={32} height={32} />
        </Link>
        <p className="text-lg italic font-semibold">Wedding</p>
      </SidebarHeader>
      <Separator className="bg-(--primary-dark-green)" />
      <SidebarContent className="bg-(--primary-green)">
        <SidebarGroup>
          <SidebarGroupLabel className="text-(--primary-tan)">
            PAGES
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col">
              {getNavItems().map((item) => (
                <SidebarMenuItem key={item.to} className="text-(--primary-tan)">
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
