export interface RouteHeadData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const keywords = [
  'Supply Chain Management Consultant',
  'Principal Supply Chain Advisor',
  'Data mining, cleansing and Forensics',
  'Automation Evaluation and Selection',
  'FP&A automation platform and AI‑driven financial software',
  'AI‑based cost‑to‑serve analysis',
  'customer and SKU profitability intelligence',
  'real‑time margin visibility',
  'cost‑to‑serve analytics for supply chain operations',
  'Python‑enabled modeling environment',
  'CFO‑grade planning intelligence',
  'board‑ready financial insights',
  'enterprise performance management AI',
  'real‑time sensitivity analysis',
  'agentic scenario orchestration',
].join(', ');

export const ROUTE_METADATA: Record<string, RouteHeadData> = {
  '/': {
    title: 'Eagle Eye Advisory - Strategic Business Guidance',
    description:
      'Independent insight. Operational clarity. Strategic execution.',
    keywords,
    ogTitle: 'Eagle Eye Advisory',
    ogDescription:
      'Independent insight. Operational clarity. Strategic execution.',
  },
  '/partners': {
    title: 'Our Partners | Eagle Eye Advisory',
    description:
      'Meet the strategic partners behind Eagle Eye Advisory - SKOPOS Advisory and JBo Labs.',
    keywords,
    ogTitle: 'Our Partners',
    ogDescription: 'Meet the strategic partners behind Eagle Eye Advisory',
  },
};
