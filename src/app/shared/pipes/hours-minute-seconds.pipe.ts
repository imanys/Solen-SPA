import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'HoursMinuteSeconds'
})
export class HoursMinuteSecondsPipe implements PipeTransform {
  transform(value: number): string {
    let minutes: number = Math.floor(value / 60);
    if (minutes > 59) {
      const hours: number = Math.floor(value / 3600);
      const rest = value - (hours * 3600);
      minutes = Math.floor(rest / 60);
      return  hours + ':' + minutes + ':' + (rest - minutes * 60);
    }
    return minutes + ':' + (value - minutes * 60);
  }
}
