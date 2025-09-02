import { Routes } from '@angular/router';
import { PersonalInfoComponent } from './personal-info.component';

export const personalInfoRoutes: Routes = [
  {
    path: '',
    component: PersonalInfoComponent,
    data: { breadcrumb: 'Personal information' },
  },
];
