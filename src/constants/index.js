import {
  Angular,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  nodejs,
  TCS,
  epam,
  Genpact,
} from '../assets';

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

const services = [
  {
    title: 'Sr. React Developer',
    icon: reactjs,
  },
  {
    title: 'Sr. Angular Developer',
    icon: Angular,
  },
  {
    title: 'Javascript Developer',
    icon: javascript,
  },
  {
    title: 'Typescript Developer',
    icon: typescript,
  },
];

const technologies = [
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Angular',
    icon: Angular,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
];

const experiences = [
  {
    title: 'Senior Frontend Engineer',
    company_name: 'EPAM Systems, Pune',
    icon: epam,
    iconBg: '#383E56',
    date: 'June 2022 - Present',
    points: [
      'Architected and delivered reusable dashboard, table, and charting components for cloud-based network security DNS analytics platform, powering multiple workflows across the application.',
      'Built real-time DNS traffic visualization features using Apache ECharts, enabling security analysts to investigate threats faster and make data-driven decisions.',
      'Optimized application performance by integrating Cube.js for server-side data aggregation, achieving 15%+ improvement in page load times for data-intensive modules.',
      'Designed Redux architecture using feature-based slices and custom hooks, establishing consistent state management patterns adopted across multiple engineering teams.',
      'Took initiative to architect and deploy centralized AI development framework across 10+ enterprise micro-frontends, reducing AI configuration complexity by 80% through reusable agent libraries and standardized prompt patterns.',
      'Collaborated with cross-functional teams to implement micro-frontend architecture, improving code modularity and enabling independent deployments.',
    ],
  },
  {
    title: 'UI Consultant',
    company_name: 'Genpact, Gurugram',
    icon: Genpact,
    iconBg: '#E6DEDD',
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
    icon: TCS,
    iconBg: '#383E56',
    date: 'December 2017 - March 2021',
    points: [
      'Developed reusable Angular form components for Aviva insurance platform, deployed across multiple customer lifecycle stages and reducing development time for new features.',
      'Integrated Kofax-based automated KYC solution into insurance onboarding flow, reducing customer onboarding time by 50%+ and improving user experience significantly.',
      'Contributed to frontend architecture decisions focusing on scalability and performance optimization for enterprise banking and insurance applications.',
      'Built centralized form validation framework using reactive patterns, ensuring consistency and reusability across the application.',
    ],
  },
];

export { services, technologies, experiences };
