// highlight-search-term.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearchTerm',
})
export class HighlightSearchTermPipe implements PipeTransform {
  public transform(value: string, searchTerm: string): string {
    if (!searchTerm) {
      return value;
    }
    const regex = new RegExp(`(${searchTerm})`, 'gi');

    return value.replace(regex, '<span class="search-highlight">$1</span>');
  }
}
