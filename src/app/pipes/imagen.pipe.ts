import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, userId: string): unknown {
    return `${URL}/posts/imagen/${userId}/${imagen}`;
  }

}
