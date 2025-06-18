import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  public technology = [
    { name: 'Angular' },
    { name: 'TypeScript' },
    { name: 'Sass' },
    { name: 'Jest' },
    { name: 'Postman' },
    { name: 'Npm' },
    { name: 'Webpack' },
    { name: 'Git' },
    { name: 'GitHub' },
    { name: 'VSCode' },
    { name: 'WebStorm' },
    { name: 'Commercetools' },
  ];

  public collaboration = [{ name: 'GitHub' }, { name: 'Diagrams' }, { name: 'Discord' }, { name: 'Telegram' }];
}
