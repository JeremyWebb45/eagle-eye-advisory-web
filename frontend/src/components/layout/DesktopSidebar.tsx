import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Link } from 'react-router-dom';
import { getNavItems } from '@/lib/utils';
import { useUserContext } from '@/providers/UserProvider';

export default function DesktopSidebar() {
  const { user } = useUserContext();
  return (
    <Sidebar className="bg-(--primary-blue) text-(--primary-yellow)">
      <SidebarHeader className="flex flex-col items-center p-4 bg-(--primary-blue)">
        <Link to="/" className="flex gap-2 items-center w-full">
          <span className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-(--primary-yellow)">
            <img src="/logo.png" alt="Logo" width={32} />
          </span>
          <p className="font-bold italic">Eagle Eye Advisory</p>
        </Link>
        <div className="flex flex-col italic text-[10px] w-full text-primary-foreground">
          <p>Independent insight. Operational clarity. Strategic execution.</p>
        </div>
      </SidebarHeader>
      <Separator className="bg-(--primary-dark-blue)" />
      <SidebarContent className="bg-(--primary-blue)">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground">
            PAGES
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col">
              {getNavItems(user).map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.to}
                      className="hover:bg-(--primary-dark-blue)! hover:text-(--primary-yellow)!"
                    >
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
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
