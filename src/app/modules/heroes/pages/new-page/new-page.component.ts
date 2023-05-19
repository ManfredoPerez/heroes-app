import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '@modules/heroes/components/confirm-dialog';
import { Hero, Publisher } from '@modules/heroes/models';
import { HeroesService } from '@modules/heroes/services';

@Component({
  templateUrl: './new-page.component.html'
})
export class NewPageComponent implements OnInit {
  @Input()
  id?: string;

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl<string>(''),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ];

  private heroesService = inject(HeroesService);
  private snackbar = inject(MatSnackBar);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  ngOnInit(): void {
    if ( !this.id ) return

    this.heroesService.getHeroById(this.id).subscribe((hero) => {
      this.heroForm.reset(hero)
      return;
    })

  }

  OnSubmit(): void {
    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value,
    // })
    if ( this.heroForm.invalid ) return;
    
    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        // Mostrar un sanckBar
        this.router.navigate(['/heroes/list']);
        this.showSnackbar(`${hero.superhero} modificado con exito!`)

      });

      return;

    }
    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      // TODO mostrar un snackbar
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackbar(`${hero.superhero} creado con exito!`)

    })
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw Error ('Hero id is requerid');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      // console.log('deleted')
      this.heroesService.deleteHero(this.currentHero.id).subscribe((wasDeleted) => {
        if(wasDeleted)
          this.router.navigate(['/heroes/list']);    
      });
      
    })

  }

    showSnackbar(message: string): void{
      this.snackbar.open(message, 'done', {
        duration: 2500,
      })
    }
  
}
 