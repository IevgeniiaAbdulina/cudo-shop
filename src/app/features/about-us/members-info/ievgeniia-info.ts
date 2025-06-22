import { TeamMemberInfo } from '../interfaces/team-members';

export const IevgeniiaInfo: TeamMemberInfo = {
  name: 'Ievgeniia Abdulina',
  role: 'Web Developer, Team Leader',
  contactGitHub: 'https://github.com/ievgeniiaabdulina',
  contactLinkedIn: 'https://www.linkedin.com/in/ievgeniiaabdulina',
  contactEmail: 'ievgeniiaabdulina@gmail.com',
  resume: 'https://ievgeniiaabdulina.github.io/rsschool-cv',
  portfolio: 'https://ievgeniiaabdulina.github.io/Personal-Portfolio-Webpage/',
  image:
    'https://firebasestorage.googleapis.com/v0/b/personal-portfolio-b7e69.appspot.com/o/RS-School-JavaScript-course-2024%2FFinal-task%2Fabout-us-page%2Fpersonal-photo-sm.png?alt=media&token=50340c0a-ce27-49ad-9974-ea00614a2a67',
  bio: 'Hello, nice to meet you! My name is Ievgeniia, I am an inspired junior front-end developer excited to contribute my skills and enthusiasm to the dynamic team. Committed to staying current with the latest web development practices and offering responsive and engaging web solutions for diverse projects. Using my commercial experience in Web UI Design, I want to develop a modern technical and interactive application and high-quality user experience. My hobby is reading fantasy books and playing video games. I am very interested in 3D modeling and 3D printing. I post photos and illustrations on Shutterstock and sell handmade polymer clay earrings. I love learning something new and opening new possibilities for the realization of my ideas.',
  technicalSkills: [
    {
      tech: 'Frontend Development',
      stack:
        'Angular & Redux, NgRx, TypeScript, React & Redux, JavaScript, RxJS, HTML5, CSS, SASS, SCSS, Bootstrap, Angular Material, npm, Webpack, Git, GitHub, MongoDB, VSCode, WebStorm.',
    },
    {
      tech: 'Frontend Technologies',
      stack: 'Design Patterns, Responsive Web Design, Object-Oriented Programming, Single Page Applications, Web APIs, WebSocket.',
    },
    {
      tech: 'Prototyping Tools',
      stack: 'Figma, Draw.io, Webflow, Adobe Illustrator, Adobe Photoshop.',
    },
    {
      tech: 'Testing',
      stack: 'Unit testing, Postman, Jest, Husky.',
    },
    {
      tech: 'Collaboration',
      stack: 'GitHub, GitHub Projects, Postman Collections, Trello.',
    },
  ],
  contributions: {
    header: '',
    body: [
      {
        th: 'Project management  & Agile Coordination',
        td: [
          'Daily stand-ups and Agile (Scrum) processes, ensuring efficient collaboration, task prioritization, and sprint goal alignment.',
          'Managed GitHub Projects to plan, track, and visualize work—organizing issues, pull requests for transparency and accountability.',
          'Created UI mock-ups and prototypes, streamlining design discussions and accelerating frontend development.',
        ],
      },
      {
        th: 'Frontend Architecture & Setup',
        td: [
          'Initialized and structured the Angular project, establishing a scalable foundation.',
          'Configured crucial dev tools: ESLint, TSLint, Prettier, and Husky to enforce code quality, consistency, and pre-commit checks.',
        ],
      },
      {
        th: 'Authentication & State Management',
        td: [
          'Led user authentication via CommerceTools’ authorization service, ensuring secure access control.',
          'Implemented Angular Auth Interceptors (for token handling) and Auth Guards (for role-based routing), enhancing security for authorized/unauthorized users.',
          'Designed state management for seamless user sessions and data persistence.',
        ],
      },
      {
        th: 'E-Commerce Features & Commercetools Integration [User Profile]',
        td: ['Developed the User Profile module, including editable fields and address management with real-time updates.'],
      },
      {
        th: 'E-Commerce Features & Commercetools Integration [Catalog & Product Navigation]',
        td: [
          'Built dynamic routing for Catalog and Product Detail pages.',
          'Added sorting (price/name) and breadcrumb navigation for improved UX.',
          'Integrate Catalog Page with Commercetools API to Enable Adding Products to Cart.',
        ],
      },
      {
        th: 'E-Commerce Features & Commercetools Integration [Cart Page]',
        td: [
          'Integrated CommerceTools API to display cart items info and calculate totals.',
          'Enabled item quantity adjustments with real-time API sync and cost recalculation.',
          'Implemented promo code functionality, applying discounts via API.',
        ],
      },
      {
        th: 'Commercetools Merchant Center',
        td: ['Contributed to configuring CommerceTools in the Merchant Center panel for backend management.'],
      },
      {
        th: 'UX & Navigation',
        td: [
          'Developed About Us page, crafting content that highlighted: development processes, team collaboration workflows, and Individual team member contributions, recognizing each developer’s role and expertise.',
          'Streamlined routing for About Us and Cart pages, ensuring intuitive navigation.',
        ],
      },
      {
        th: 'Impact & Innovation',
        td: [
          'Efficiency: Tools like Husky/Prettier reduced code review time by standardizing formatting, while GitHub Projects streamlined task tracking and team coordination.',
          'User-Centric Design: Profile edit mode, cart features, and the About Us page enhanced transparency and customer engagement.',
          'Technical Robustness: Auth Guards and Interceptors fortified security, while state management optimized performance.',
        ],
      },
    ],
    footer: '',
  },
  collaboration: {
    header: "Our team's success was driven by a structured yet adaptive system of collaboration",
    body: [
      {
        th: 'Daily Stand-up meetings',
        td: [
          'Synchronized priorities, surfaced blockers, and maintain momentum through concise progress sharing.',
          'Proactive knowledge-sharing and cross-functional problem-solving.',
        ],
      },
      {
        th: 'Sprint Planning',
        td: ['The team plans the work for the upcoming sprint.', 'Tool: GitHub Projects with sprint boards.'],
      },
      {
        th: 'Sprint Demos',
        td: [
          'Validate functionality against requirements.',
          'Gather stakeholder feedback for backlog refinement.',
          'Impact: Reduced rework time through early feedback incorporation.',
        ],
      },
      {
        th: 'Sprint Retrospective',
        td: ['Identified improvements to workflows.', 'Tracked action items via GitHub Issues.'],
      },
      {
        th: 'Open Communication',
        td: ['Maintained a responsive "Discord" channel for real-time problem-solving, reducing delays in decision-making.'],
      },
      {
        th: 'Pair Programming',
        td: ['Adopted for complex tasks to share knowledge and improve code quality.'],
      },
      {
        th: 'Code Review',
        td: [
          'Enforced a "minimum one approval" policy for merges Pull Request.',
          'Clean, maintainable code (validated via ESLint/Prettier).',
          'Scalability considerations',
        ],
      },
      {
        th: 'Task Tracking',
        td: ['Used GitHub Issues with labels (bug/feature) and priority tiers (P0-P2) to focus efforts on high-impact deliverables.'],
      },
      {
        th: 'Adaptive Prioritization',
        td: ['Regularly reassessed backlogs during sprint planning to balance feature development and bug fixes.'],
      },
    ],
    footer:
      'This culture of transparency, accountability, and continuous improvement enabled our small team to deliver a robust product on time while maintaining high morale.',
  },
};
