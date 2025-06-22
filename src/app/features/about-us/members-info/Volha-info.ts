import { TeamMemberInfo } from '../interfaces/team-members';

export const VolhaInfo: TeamMemberInfo = {
  name: 'Volha Rekun',
  role: 'Web Developer',
  contactGitHub: 'https://github.com/rekunolya',
  contactLinkedIn: 'https://www.linkedin.com/in/olga-rekun-981b95222/',
  contactEmail: 'rekun.olya@gmail.com',
  resume: '',
  portfolio: '',
  image:
    'https://firebasestorage.googleapis.com/v0/b/personal-portfolio-b7e69.appspot.com/o/RS-School-JavaScript-course-2024%2FFinal-task%2FVolha_Rekun.jpg?alt=media&token=d8dbd8d1-5d10-4c6c-b53a-1ae5cc2fe981',
  bio: "I am a software engineer-economist by education, but unfortunately I have never worked in my speciality. Currently, I am a bored housewife with nothing to do, so I am entertaining myself by studying at RS School in the hope that someday my desire and dream of being a front-end developer will come true. I like to see the result of my work, enjoy the process and I am very happy like a child every time when the result exceeds expectations. I like reading classic literature, I enjoy crocheting, and I can't sit still, so I always try to learn something new.",
  technicalSkills: [
    { tech: 'Frontend Development', stack: 'HTML5, CSS3, SCSS, JavaScript, TypeScript, Angular.' },
    { tech: 'Tools & Technologies', stack: 'Microsoft Visual Studio Code, Git, GitHub, Webpack.' },
    { tech: 'Programming Languages', stack: 'Java (basics).' },
    { tech: 'Concepts', stack: 'Object-Oriented Programming (OOP).' },
  ],
  contributions: {
    header: '',
    body: [
      {
        th: 'Highlighting significant contributions to the project',
        td: [
          'Header with logo, search and registration/login buttons;',
          'Designed registration and login pages;',
          'Designed main page and page not found;',
          'Implemented error handling on authorization;',
          'Developed template product detailed page with slider and modal with slider, fetch detailed information of a product from the commercetools API according to the requirements such as image(s), name, description, price, sales, currency;',
          'Added navigation buttons to catalog page on header;',
          'Designed empty cart and display friendly message for user with inviting to continue shopping, implemented button to catalog page;',
          'Implemented footer attribution info with links to developer`s GitHub, page "about us", link to project course and year of developing;',
          'Added RS School logo with link to RS School page;',
          'Implemented performance optimization with pagination, fetch products from the commerceTools API;',
          'Fetch products to main page;',
          'And also searched and filled the commerceTools API with information about products, set tax category and discounts for selected categories;',
        ],
      },
    ],
    footer: '',
  },
  collaboration: {
    header: '',
    body: [
      {
        th: '',
        td: ['Our team`s success was driven by a structured yet adaptive system of collaboration'],
      },
    ],
    footer: '',
  },
};
