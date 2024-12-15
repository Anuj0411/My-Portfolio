import {
  mobile,
  web,
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
  }
];

const services = [
  {
    title: 'Sr. Angular Developer',
    icon: Angular,
  },
  {
    title: 'React Developer',
    icon: reactjs,
  },
  {
    title: 'Javascript Developer',
    icon: javascript
  },
  {
    title: 'Typescript Developer',
    icon: typescript
  }
];

const technologies = [
  {
    name: 'Angular',
    icon: Angular
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
    name: 'React JS',
    icon: reactjs,
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
  }
];

const experiences = [
  {
    title: 'Sr. Software Engineer',
    company_name: 'EPAM, Pune',
    icon: epam,
    iconBg: '#383E56',
    date: 'June 2022 - Current',
    points: [
      `UI Development & Customization: Led the development of
      advanced, customizable UI components such as actionable and
      filterable tables, cards, charts, and interactive dashboards for
      network security application, ensuring dynamic data visualization and
      a seamless user experience.`,
      `Data-Intensive Application: Led the development of a data-heavy
      module by implementing the Model Adapter Pattern for robust data
      modeling and ensuring efficient, maintainable data flow across the
      application.`,
      `Data Visualization & Insights: Developed interactive DNS traffic
      visualization using Apache ECharts, delivering actionable insights
      through real-time data representation.`,
      `Optimized Data Fetching: Integrated Cube.js for efficient data
      fetching and processing, significantly improving the application’s
      scalability and performance in handling large data sets.`,
      `UX Collaboration & Consistency: Worked closely with the UX team
      to ensure all UI components followed design consistency, usability,
      and core library standards, maintaining high alignment with UX best
      practices.`,
    ],
  },
  {
    title: 'UI Consultant',
    company_name: 'Genpact, Gurugram',
    icon: Genpact,
    iconBg: '#E6DEDD',
    date: 'March 2021 - June 2022',
    points: [
      `Digitized Manufacturing Operations: Led the digitization of manufacturing processes for a multinational corporation, focusing on user experience and improving efficiency through system automation.`,
      `Voucher Module Development: Architected and developed a labor/operator voucher module using RxJS, NgRx, and micro-frontends, transforming a manual process into an organized, digital solution that boosted productivity.`,
      `Micro-Frontend & Collaboration: Implemented micro-frontends architecture for modular UI development and collaborated with cross-functional teams to deliver scalable, user-centric solutions, maintaining high coding standards.`,
    ],
  },
  {
    title: 'Front End Developer',
    company_name: 'TCS, Indore',
    icon: TCS,
    iconBg: '#383E56',
    date: 'Dec 2017 - March 2021',
    points: [
      'Participated in the end-to-end development of an insurance product, adhering to strict deadlines and coding standards.',
      'Automated customer data verification via Kofax integration,optimizing operational efficiency.',
      'Established a centralized reactive form validation module to ensure reusability.',
      'Played a key role in designing the initial application architecture,prioritizing scalability and maintainability.',
    ],
  },
];

export { services, technologies, experiences };
