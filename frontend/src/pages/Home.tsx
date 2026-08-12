import AboutSection from '@/components/home/AboutSection';
import SectionTitle from '@/components/SectionTitle';
import TemplateLibrary from '@/components/home/TemplateLibrary';
import WhoSection from '@/components/home/WhoSection';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEnvVars } from '@/lib/utils';

const API_URL = getEnvVars().apiUrl;

export default function Home() {
  return (
    <>
      <span className="flex gap-x-8 gap-y-2 items-end flex-wrap">
        <SectionTitle>
          <div>
            <p>What is Eagle</p>
            <p>Eye Advisory?</p>
          </div>
        </SectionTitle>
        <Link
          to={`${API_URL}/files/Eagle Eye Evolution - AUG 4 2026.pdf`}
          target="_blank"
          className="flex h-fit items-center gap-2 my-4 text-sm font-semibold border border-(--primary-dark-blue) rounded-lg p-2 bg-(--primary-blue) text-(--primary-yellow) hover:bg-(--primary-dark-blue) transition-colors"
        >
          Read more <ExternalLink size={16} />
        </Link>
      </span>
      <AboutSection />

      <SectionTitle>Who am I?</SectionTitle>
      <WhoSection />

      <SectionTitle>Template Library</SectionTitle>
      <TemplateLibrary />
    </>
  );
}
