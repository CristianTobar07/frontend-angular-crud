import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusTask',
})
export class StatusTaskPipe implements PipeTransform {
  transform(status: number): string {
    switch (status) {
      case 1:
        return 'Pendiente';
      case 2:
        return 'En Proceso';
      case 3:
        return 'Completada';
      default:
        return 'Pendiente';
    }
  }
}
