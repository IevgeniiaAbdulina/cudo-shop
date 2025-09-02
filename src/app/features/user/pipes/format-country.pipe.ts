import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCountry',
})
export class FormatCountryPipe implements PipeTransform {
  public transform(value: string | undefined): string {
    let countryName = '';

    switch (value) {
      case 'PL':
        countryName = 'Poland';
        break;
      case 'DE':
        countryName = 'Germany';
        break;
      case 'US':
        countryName = 'United States';
        break;
    }

    return countryName;
  }
}
