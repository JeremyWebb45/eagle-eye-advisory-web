import type { Template } from '@/data/types';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TemplateGridProps {
  templates: Template[];
}

export default function TemplateGrid({ templates }: TemplateGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
      {templates.map((template) =>
        template.link ? (
          <Link
            className="flex flex-col font-semibold gap-2 p-4 border no-underline! text-(--primary-yellow) hover:text-(--primary-yellow)! border-(--primary-dark-blue) bg-(--primary-blue) rounded-lg hover:bg-(--primary-dark-blue) transition-colors"
            to={template.link}
            target="_blank"
            key={template.title}
          >
            {template.title}
            <p className="text-xs font-normal flex items-center gap-2">
              Read more <ExternalLink size={16} />
            </p>
          </Link>
        ) : (
          <span
            className="flex flex-col font-semibold justify-between gap-2 p-4 border text-(--primary-yellow) border-(--primary-dark-blue) bg-(--primary-blue) rounded-lg"
            key={template.title}
          >
            {template.title}
            <p className="text-xs font-normal">Coming soon...</p>
          </span>
        )
      )}
    </div>
  );
}
