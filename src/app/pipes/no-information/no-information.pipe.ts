import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noInformation'
})
export class NoInformationPipe implements PipeTransform {

  transform(value: string | number | Date | null): string | number | Date {

    if (!value) return 'Sin información';
    return value;
  }

}
