import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: false
})
export class FileSizePipe implements PipeTransform {

  // Pipe qui converti les bytes d'un fichier en 'KB', 'MB', 'GB', 'TB'
  transform(bytes: number): string {
    if (isNaN(bytes) || bytes === 0) return '0 Bytes';

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1000));

    return `${parseFloat((bytes / Math.pow(1000, i)).toFixed(2))} ${sizes[i]}`;
  }
}
