import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
})
export class InitialsPipePipe implements PipeTransform {
  transform(firstName?: string | null, lastName?: string | null): string {
    const f = firstName?.trim().charAt(0) ?? '';
    const l = lastName?.trim().charAt(0) ?? '';
    return (f + l).toUpperCase();
  }
}
