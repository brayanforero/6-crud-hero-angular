import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroModel } from '../models/hero.model';
import { map } from 'rxjs/operators';
interface HeroFirebase {
  [k: string]: HeroModel;
}
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private URL = 'https://heroes-rest-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) {}

  getHeroes() {
    return this.http
      .get<HeroFirebase>(`${this.URL}/heroes.json`)
      .pipe(map(this.heroesObjToArray));
  }

  heroesObjToArray(heroesObj: HeroFirebase) {
    const heroes: HeroModel[] = [];
    if (heroesObj === null) return [];

    Object.keys(heroesObj).forEach((key) => {
      const hero: HeroModel = heroesObj[key];
      hero.id = key;

      heroes.push(hero);
    });
    return heroes;
  }
}
