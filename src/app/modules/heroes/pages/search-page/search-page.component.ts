import { Component, inject, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '@modules/heroes/models';
import { HeroesService } from '@modules/heroes/services';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent {

    public searchInput = new FormControl('')

    public heroes: Hero[] = [];
    public selectdHero?: Hero;
    
    private heroesService = inject(HeroesService);

    searchHero(): void {
      const value: string = this.searchInput.value || '';

      this.heroesService.getSuggestions(value).subscribe((heroes) => this.heroes = heroes);
    }

    onSelectedOption(event: MatAutocompleteSelectedEvent): void  {
      // console.log(event.option.value)

      if( !event.option.value){
        this.selectdHero = undefined;
        return 
      }

      const hero: Hero = event.option.value
      this.searchInput.setValue(hero.superhero);

      this.selectdHero = hero;
    }
  }
