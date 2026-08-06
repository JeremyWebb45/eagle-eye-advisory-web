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
import TemplateGrid from './TemplateGrid';

const TEMPLATE_SUITES = [
  {
    value: 'executive-suite',
    title: 'Executive Suite',
    templates: EXEC_SUITE_TEMPLATES,
  },
  {
    value: 'management-suite',
    title: 'Management Suite',
    templates: M_SUITE_TEMPLATES,
  },
  {
    value: 'engineering-suite',
    title: 'Engineering Suite',
    templates: ENG_SUITE_TEMPLATES,
  },
  {
    value: 'systems',
    title: 'Systems Integration Support',
    templates: SYS_INT_TEMPLATES,
  },
];

export default function TemplateLibrary() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <p>
        If one of these does not match your situation, we will happily develop
        to your specifications
      </p>
      <Accordion type="single" defaultValue="executive-suite">
        {TEMPLATE_SUITES.map(({ value, title, templates }) => {
          const linkCount = templates.filter((t) => t.link).length;
          const subTitle =
            linkCount > 0 ? `${linkCount} template(s) available` : null;
          return (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-lg font-semibold items-center cursor-pointer hover:no-underline">
                <div className="flex w-full justify-between items-center flex-wrap">
                  {title}
                  {subTitle && <p className="text-sm pr-4">{subTitle}</p>}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <TemplateGrid templates={templates} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
