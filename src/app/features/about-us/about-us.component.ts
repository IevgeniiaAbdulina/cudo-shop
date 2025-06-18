import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  imports: [MatCardModule, MatButton, NgOptimizedImage, MatIcon, RouterLink],
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

  public teamMembers = [
    {
      name: 'Alena Papruha',
      role: 'Web Developer',
      contactGitHub: 'https://github.com/AlenaVP',
      contactLinkedIn: '',
      contactEmail: 'registrap93@gmail.com',
      image:
        'https://firebasestorage.googleapis.com/v0/b/personal-portfolio-b7e69.appspot.com/o/RS-School-JavaScript-course-2024%2FFinal-task%2Falena-img.png?alt=media&token=4b0892b0-d5d2-4bef-a586-447e5404d808',
    },
    {
      name: 'Ievgeniia Abdulina',
      role: 'Web Developer, Team Leader',
      contactGitHub: 'https://github.com/ievgeniiaabdulina',
      contactLinkedIn: 'https://www.linkedin.com/in/ievgeniiaabdulina',
      contactEmail: 'ievgeniiaabdulina@gmail.com',
      image:
        'https://camo.githubusercontent.com/0416dd27dfe8e345be95abbf7235c3fd8ba13f75904f4d66c53cc00b7c36e6a4/68747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f706572736f6e616c2d706f7274666f6c696f2d62376536392e61707073706f742e636f6d2f6f2f52532d5363686f6f6c2d4a6176615363726970742d636f757273652d32303234253246706572736f6e616c2d70686f746f2e6a70673f616c743d6d6564696126746f6b656e3d34386232303835372d393463322d346662332d393430662d626534316337633030333032',
    },
    {
      name: 'Volha Rekun',
      role: 'Web Developer',
      contactGitHub: 'https://github.com/',
      contactLinkedIn: 'https://www.linkedin.com/in/',
      contactEmail: 'iuser@gmail.com',
      image: 'img',
    },
  ];
}
