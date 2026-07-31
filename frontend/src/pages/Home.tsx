import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ENG_SUITE_TEMPLATES,
  EXEC_SUITE_TEMPLATES,
  M_SUITE_TEMPLATES,
  SYS_INT_TEMPLATES,
} from '@/lib/consts';
import { User } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex w-full flex-col flex-1 relative max-w-5xl">
      <div className="p-4 flex flex-col gap-4 text-(--primary-dark-blue)">
        <div className="flex w-full flex-col text-4xl font-semibold my-4">
          <p>What is Eagle</p>
          <p>Eye Advisory?</p>
        </div>
        <div className="flex w-full flex-col gap-2">
          <p>
            Eagle Eye Advisory LLC is an advisory services company which
            provides financial planning and analysis (FP&A) tools for business
            professionals.
          </p>
          <ul className="list-disc list-outside pl-4 gap-2 flex flex-col">
            <li>
              Development of client-tailored business models which address the
              more challenging aspects of sizing and designing a warehouse,
              distribution center, or manufacturing operation
            </li>
            <li>
              <p>
                <b>EEA - Financial Planning and Analysis (FP&A) Toolkit TM</b> -
                Fact based, financial approach and "simple" models which can be
                used to determine critical design inputs such as inventory
                holding requirements, building throughput capacity, labor and
                operating expenses, and capital equipment - See library for full
                listing
              </p>
            </li>
          </ul>
        </div>
        <div className="flex w-full justify-between text-4xl font-semibold my-4">
          <p>Who am I?</p>
          <span className="w-10 h-10 mr-4 lg:mr-16 rounded-full flex items-center justify-center border-2 border-(--primary-dark-blue)">
            <User className="w-8 h-8" />
          </span>
        </div>
        <div className="flex w-full flex-col gap-2">
          <p className="font-bold">
            Hello, I am Barry Webb, Founder and Principal of Eagle Eye Advisory
            LLC
          </p>
          <ul className="list-disc list-outside pl-4 gap-2 flex flex-col">
            <li>
              Lifelong supply chain practitioner - Fortune 500 business,
              consulting experience in tier one firms, integrators, and
              boutiques
            </li>
            <li>
              Industrial engineering background - data driven analysis and
              design methodology - data mining, cleansing, and forensics
            </li>
            <li>
              Passionate about operational efficiency and business modeling for
              supply chain operations and business functions
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-full text-4xl font-semibold my-4">
          <p>Templates</p>
          <p>available</p>
        </div>
        <p>
          If one of these does not match your situation, we will happily develop
          to your specifications
        </p>
        <Accordion type="single" defaultValue="executive-suite">
          <AccordionItem value="executive-suite">
            <AccordionTrigger className="text-lg font-semibold">
              Executive Suite
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                {EXEC_SUITE_TEMPLATES.map((template) => (
                  <div
                    key={template}
                    className="p-4 border rounded-lg bg-(--primary-blue) border-(--primary-dark-blue) text-(--primary-yellow)"
                  >
                    {template}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="management-suite">
            <AccordionTrigger className="text-lg font-semibold">
              Management Suite
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                {M_SUITE_TEMPLATES.map((template) => (
                  <div
                    key={template}
                    className="p-4 border rounded-lg bg-(--primary-blue) border-(--primary-dark-blue) text-(--primary-yellow)"
                  >
                    {template}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="engineering-suite">
            <AccordionTrigger className="text-lg font-semibold">
              Engineering Suite
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                {ENG_SUITE_TEMPLATES.map((template) => (
                  <div
                    key={template}
                    className="p-4 border rounded-lg bg-(--primary-blue) border-(--primary-dark-blue) text-(--primary-yellow)"
                  >
                    {template}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="systems">
            <AccordionTrigger className="text-lg font-semibold">
              Systems Integration Support
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                {SYS_INT_TEMPLATES.map((template) => (
                  <div
                    key={template}
                    className="p-4 border rounded-lg bg-(--primary-blue) border-(--primary-dark-blue) text-(--primary-yellow)"
                  >
                    {template}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex w-full text-4xl font-semibold my-4">
          <p>Contact Us</p>
        </div>
        <p>Coming soon...</p>
      </div>
    </div>
  );
}
