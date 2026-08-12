import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Card, CardHeader } from '@/components/ui/card';
import { Menu, X } from 'lucide-react';
import useShyNav from '@/hooks/useShyNav';
import { Separator } from '../ui/separator';
import { Link } from 'react-router-dom';
import { getNavItems } from '@/lib/utils';
import { useUserContext } from '@/providers/UserProvider';

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isShy = useShyNav();
  const { user } = useUserContext();
  return (
    <>
      <div
        className={`sticky z-10 top-0 ${!isShy ? 'translate-y-[-110%]' : 'translate-y-0'} transition-transform`}
      >
        <Drawer direction="top">
          <DrawerContent className="bg-(--primary-blue) text-(--primary-yellow) border-b border-(--primary-dark-blue)">
            <DrawerHeader className="flex justify-between items-center flex-row">
              <DrawerTitle className="font-bold text-(--primary-tan)">
                PAGES
              </DrawerTitle>
              <DrawerTrigger>
                <X />
              </DrawerTrigger>
            </DrawerHeader>
            <Separator className="bg-(--primary-dark-blue)" />
            <div className="flex flex-col gap-4 p-4">
              {getNavItems(user).map((item) => (
                <Link key={item.to} to={item.to}>
                  <DrawerTrigger className="flex items-center gap-2 w-full ">
                    {item.icon}
                    <span className="font-bold">{item.label}</span>
                  </DrawerTrigger>
                </Link>
              ))}
            </div>
            <div className="flex justify-between items-center p-4">
              <div className="flex w-fit flex-col">
                <p className="font-semibold w-fit">
                  Eagle Eye Advisory Services LLC
                </p>
                <p className="italic text-xs">
                  Independent insight. Operational clarity.
                </p>
                <p className="italic text-xs">Strategic execution.</p>
              </div>
              <div className="flex items-center justify-center h-16 w-16 bg-white rounded-full border-2 border-(--primary-yellow)">
                <img src="/logo.png" alt="Logo" className="w-12 h-auto" />
              </div>
            </div>
          </DrawerContent>
          <Card className="rounded-none shadow-md bg-(--primary-blue) border-b border-(--primary-dark-blue)">
            <CardHeader className="flex justify-between items-center">
              <Link
                to="/"
                className="bg-white h-8 w-8 rounded-full border-(--primary-yellow) border-2 flex items-center justify-center"
              >
                <img src="/logo.png" alt="Logo" className="w-6 h-auto" />
              </Link>
              <p className="text-lg italic font-bold text-(--primary-yellow)">
                Eagle Eye Advisory
              </p>
              <DrawerTrigger>
                <Menu className="text-(--primary-yellow)" />
              </DrawerTrigger>
            </CardHeader>
          </Card>
        </Drawer>
      </div>
      {children}
    </>
  );
}
