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
          <DrawerContent className="bg-(--primary-blue) text-(--primary-yellow)">
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
              {getNavItems().map((item) => (
                <Link key={item.to} to={item.to}>
                  <DrawerTrigger className="flex items-center gap-2 w-full ">
                    {item.icon}
                    <span className="font-bold">{item.label}</span>
                  </DrawerTrigger>
                </Link>
              ))}
            </div>
            <div className="flex justify-between items-center w-fit">
              <div className="p-4">
                <p className="font-semibold w-fit">
                  Eagle Eye Advisory Services LLC
                </p>
                <p className="italic max-w-4/6 w-fit text-xs">
                  Independent insight. Operational clarity. Strategic execution.
                </p>
              </div>
              <div className="mr-4 flex items-center justify-center h-20 w-20 bg-white rounded-full">
                <img src="/logo.png" alt="Logo" className="w-10 h-auto" />
              </div>
            </div>
          </DrawerContent>
          <Card className="rounded-none shadow-md bg-(--primary-blue) border-b border-(--primary-dark-blue)">
            <CardHeader className="flex justify-between items-center">
              <Link
                to="/"
                className="bg-white h-8 w-8 rounded-full flex items-center justify-center"
              >
                <img src="/logo.png" alt="Logo" className="w-6 h-auto" />
              </Link>
              <p className="text-lg italic semi-bold text-(--primary-yellow)">
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
