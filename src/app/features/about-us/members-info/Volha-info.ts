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
  bio: '',
  technicalSkills: [{ tech: 'Frontend Development', stack: 'Angular, TypeScript, SASS' }],
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
    header: 'string',
    body: [{ th: '', td: [''] }],
    footer: 'string',
  },
};
