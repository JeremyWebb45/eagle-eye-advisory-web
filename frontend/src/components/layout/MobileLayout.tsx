import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Card, CardHeader } from '@/components/ui/card';
import { Menu, X } from 'lucide-react';
import { getNavItems } from '@/lib/consts';
import useShyNav from '@/hooks/useShyNav';
import { Separator } from '../ui/separator';
import { Link } from 'react-router-dom';

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isShy = useShyNav();
  return (
    <>
      <div
        className={`sticky z-10 top-0 ${!isShy ? 'translate-y-[-110%]' : 'translate-y-0'} transition-transform`}
      >
        <Drawer direction="top">
          <DrawerContent className="bg-(--primary-green) text-(--primary-tan)">
            <DrawerHeader className="flex justify-between items-center flex-row">
              <DrawerTitle className="font-bold text-(--primary-tan)">
                PAGES
              </DrawerTitle>
              <DrawerTrigger>
                <X />
              </DrawerTrigger>
            </DrawerHeader>
            <Separator className="bg-(--primary-dark-green)" />
            <div className="flex flex-col gap-4 p-4">
              {getNavItems().map((item) => (
                <Link key={item.to} to={item.to}>
                  <DrawerTrigger className="flex items-center gap-2 w-full ">
                    {item.icon}
                    <span className="font-bold">{item.label}</span>
                  </DrawerTrigger>
                </Link>
              ))}
            </div>
          </DrawerContent>
          <Card className="rounded-none shadow-md">
            <CardHeader className="flex justify-between items-center">
              <Link to="/" className="flex gap-2 items-center">
                <img src="/logo.png" alt="Logo" width={64} />
                <div className="flex flex-col italic text-[10px]">
                  <p>Independent insight.</p>
                  <p>Operational clarity.</p>
                  <p>Strategic execution.</p>
                </div>
              </Link>
              <DrawerTrigger>
                <Menu className="" />
              </DrawerTrigger>
            </CardHeader>
          </Card>
        </Drawer>
      </div>
      {children}
    </>
  );
}
