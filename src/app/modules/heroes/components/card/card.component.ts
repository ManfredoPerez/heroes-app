import { Component, Input, OnInit, inject } from '@angular/core';
import { Hero } from '@modules/heroes/models';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  @Input() 
  public hero!: Hero; 

  ngOnInit(): void {
    if(!this.hero) throw Error('Hero propety is required');
  }
  /*

  public heroes: Hero[] = [];

  private heroesService = inject(HeroesService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.heroesService.getHeroes().subscribe((heroes) => this.heroes = heroes);
  }*/

}
