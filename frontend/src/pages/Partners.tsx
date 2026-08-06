import SectionTitle from '@/components/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDollarSign, Handshake, Plus } from 'lucide-react';

export default function Partners() {
  return (
    <>
      <SectionTitle>
        <div className="flex gap-8 items-center">
          Our Partners <Handshake size={48} />
        </div>
      </SectionTitle>
      <p>
        At Eagle Eye Advisory LLC, we are committed to bringing you the highest
        quality results. To reach our goals, we collaborate with some of the
        best partners in the industry. Take a look at the companies we work with
        to deliver you great solutions.
      </p>
      <Card className="bg-(--primary-blue) gap-8 border-(--primary-dark-blue) lg:p-8 border text-(--primary-yellow)">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-primary-foreground flex items-center mb-8">
            Founding Partners
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 lg:flex-row lg:gap-0 w-full relative justify-center items-center">
          <div className="flex lg:w-1/2 flex-col items-center justify-center gap-4">
            <span className="flex gap-4 relative items-center justify-center">
              <img src="bear.png" className="w-50 z-10" />
              <CircleDollarSign size={84} className="absolute" />
              <img src="bull.png" className="w-50 rotate-y-180 z-10" />
            </span>
            <span className="flex text-center flex-col w-full items-center italic">
              <p className="text-xl font-bold">SKOPOS Advisory LLC</p>
              <p>AI & data driven solutions for all levels of your business</p>
            </span>
          </div>
          <Plus className="text-white z-20" size={120} />
          <div className="flex lg:w-1/2 flex-col items-center justify-center gap-4">
            <img src="JBL logo.png" className="w-50" />
            <span className="flex flex-col w-full items-center italic">
              <p className="text-xl font-bold">JBo Labs LLC</p>
              <p>Custom software & agentic UX integrations</p>
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
