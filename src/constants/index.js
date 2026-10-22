export const contactInfo = {
  email: 'anuj.parashar.140@gmail.com',
  phone: '+91 8878286663',
  linkedin: 'https://www.linkedin.com/in/anuj-parashar-b45493388/',
  github: 'https://github.com/Anuj0411',
  location: 'Pune, India',
};

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const experiences = [
  {
    title: 'Senior Frontend Engineer',
    company_name: 'EPAM Systems, Pune',
    product: 'BloxOne Cloud Services Portal — DNS, DHCP, IPAM & Threat Defense',
    date: 'June 2022 - Present',
    points: [
      'Architected and maintained 30+ independently deployable Angular micro-frontends (single-spa) across DNS, DHCP, IPAM, and Threat Defense, so teams release without blocking each other.',
      'Built an in-house Angular design system of 30+ components — data tables, wizards, and a filter engine — with theming, dark mode, and Storybook.',
      'Built the UI for an LLM-powered conversational assistant used across products: SSE-streamed answers, partial and error states, copy, feedback, and branch actions, and i18n.',
      'Defined the chart contract between the Python AI backend and the UI, and made series distinguishable by pattern and shape — not color alone.',
      'Extracted Threat Defense into a standalone micro-frontend (repo, CI/CD, Helm, routing, auth, feature flags) and moved MFEs onto a shared chat host.',
      'Led the Angular 15→21 migration with OnPush, lazy loading, code splitting, and zoneless change detection. Standardized GitHub Actions, Helm, Jest, and Playwright.',
    ],
  },
  {
    title: 'UI Consultant',
    company_name: 'Genpact, Gurugram',
    date: 'March 2021 - June 2022',
    points: [
      'Led a team of 5 engineers in modernizing aerospace manufacturing platform for GE Aerospace using micro-frontend architecture, enabling parallel development and reducing cross-team dependencies.',
      'Engineered labor/operator voucher module with Angular, RxJS, and NgRx that digitized manual shop-floor workflows, cutting processing time and errors by approximately 25%.',
      'Drove standardization efforts for shared UI component library used across multiple product teams, improving development velocity and maintaining design consistency.',
      'Championed adoption of reactive programming patterns using RxJS, improving data flow management and application responsiveness.',
    ],
  },
  {
    title: 'Frontend Developer',
    company_name: 'Tata Consultancy Services, Indore',
    date: 'December 2017 - March 2021',
    points: [
      'Developed reusable Angular form components for Aviva insurance platform, deployed across multiple customer lifecycle stages and reducing development time for new features.',
      'Integrated Kofax-based automated KYC solution into insurance onboarding flow, reducing customer onboarding time by 50%+ and improving user experience significantly.',
      'Contributed to frontend architecture decisions focusing on scalability and performance optimization for enterprise banking and insurance applications.',
      'Built centralized form validation framework using reactive patterns, ensuring consistency and reusability across the application.',
    ],
  },
];

const impacts = [
  {
    metric: '30+',
    label: 'Angular MFEs',
    detail: 'Independently deployable single-spa apps across DNS, DHCP, IPAM, and Threat Defense.',
    context: 'EPAM',
  },
  {
    metric: '15→21',
    label: 'Angular migration',
    detail:
      'OnPush, lazy loading, code splitting, and zoneless change detection on the BloxOne portal.',
    context: 'EPAM',
  },
  {
    metric: '~25%',
    label: 'Faster shop floor',
    detail:
      'Led 5 engineers on a GE Aerospace micro-frontend rebuild. Vouchers digitized, fewer errors.',
    context: 'Genpact',
  },
];

const craft = [
  {
    title: 'Architecture',
    items: ['Micro-frontends', 'single-spa', 'NgRx / RxJS', 'Independent deploys'],
  },
  {
    title: 'UI systems',
    items: ['Angular 15–21', 'TypeScript', 'React', 'Design systems'],
  },
  {
    title: 'Data viz',
    items: ['Apache ECharts', 'Cube.js', 'Accessible charts', 'Real-time dashboards'],
  },
  {
    title: 'AI-assisted delivery',
    items: ['LLM assistant UI', 'SSE streaming', 'Chart tool contract', 'Claude Code'],
  },
];

export { experiences, impacts, craft };
