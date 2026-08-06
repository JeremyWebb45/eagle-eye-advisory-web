import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhoSection() {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="flex items-center gap-x-8 gap-y-2 flex-wrap">
        <p className="font-bold">
          Hello, I am Barry Webb, Founder and Principal of Eagle Eye Advisory
          LLC
        </p>
        <Link
          to="/Executive Summary CV AUG 4 2026.pdf"
          target="_blank"
          className="flex my-2 items-center gap-2 text-sm font-semibold border border-(--primary-dark-blue) rounded-lg p-2 bg-(--primary-blue) text-(--primary-yellow) hover:bg-(--primary-dark-blue) transition-colors"
        >
          View CV
          <ExternalLink size={16} />
        </Link>
      </span>
      <ul className="list-disc list-outside pl-4 gap-2 flex flex-col">
        <li>
          Lifelong supply chain practitioner - Fortune 500 business, consulting
          experience in tier one firms, integrators, and boutiques
        </li>
        <li>
          Industrial engineering background - data driven analysis and design
          methodology - data mining, cleansing, and forensics
        </li>
        <li>
          Passionate about operational efficiency and business modeling for
          supply chain operations and business functions
        </li>
      </ul>
    </div>
  );
}
