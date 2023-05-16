import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeroesService } from '@modules/heroes/services';

@Component({
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent {

    public searchControl = new FormControl('')
    
    private heroesService = inject(HeroesService);
  }
