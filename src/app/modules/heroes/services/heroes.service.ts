import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private http = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  getHeroes(): Observable<Hero[]> { 
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById (id: string): Observable<Hero | undefined>  {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError( (error) => of(undefined) )
    );
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
  }
}