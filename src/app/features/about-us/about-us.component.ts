import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  public technology = [
    { name: 'Angular', icUrl: '../../assets/images/technology/Angular-Dark.svg' },
    { name: 'TypeScript', icUrl: '../../assets/images/technology/TypeScript.svg' },
    { name: 'Sass', icUrl: '../../assets/images/technology/Sass.svg' },
    { name: 'Jest', icUrl: '../../assets/images/technology/Jest.svg' },
    { name: 'Postman', icUrl: '../../assets/images/technology/Postman.svg' },
    { name: 'Npm', icUrl: '../../assets/images/technology/Npm-Dark.svg' },
    { name: 'Webpack', icUrl: '../../assets/images/technology/Webpack-Dark.svg' },
    { name: 'Git', icUrl: '../../assets/images/technology/Git.svg' },
    { name: 'GitHub', icUrl: '../../assets/images/technology/Github-Dark.svg' },
    { name: 'VSCode', icUrl: '../../assets/images/technology/VSCode-Dark.svg' },
    { name: 'WebStorm', icUrl: '../../assets/images/technology/WebStorm-Dark.svg' },
    { name: 'Diagrams', icUrl: '../../assets/images/technology/Diagrams.svg' },
  ];
}
