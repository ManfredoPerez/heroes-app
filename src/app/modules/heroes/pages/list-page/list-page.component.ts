import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '@modules/heroes/models';
import { HeroesService } from '@modules/heroes/services';

@Component({
  templateUrl: './list-page.component.html'
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];

  private heroesService = inject(HeroesService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.heroesService.getHeroes().subscribe((heroes) => this.heroes = heroes);
  }

}
