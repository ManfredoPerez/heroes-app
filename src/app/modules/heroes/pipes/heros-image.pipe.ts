import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../models';

@Pipe({
  name: 'heroImage'
})
export class HerosImagePipe implements PipeTransform {

  transform(hero: Hero ): string {
    if (!hero.id && !hero.alt_img) {
      return 'assets/error.jpg'
    }

    if(hero.alt_img) return hero.alt_img

    return `assets/heroes/${hero.id}.jpg`;
  }


}
