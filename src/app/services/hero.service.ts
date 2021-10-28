import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroModel } from '../models/hero.model';
import { map } from 'rxjs/operators';

interface HeroFirebase {
  [key: string]: HeroModel;
}
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private URL = 'https://heroes-rest-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) {}

  save(hero: HeroModel) {
    const heroTemp = {
      ...hero,
    };
    delete heroTemp.id;
    if (!hero.id) {
      return this.http
        .post<HeroModel>(`${this.URL}/heroes.json`, heroTemp)
        .pipe(
          map((resp) => {
            hero.id = resp.name;
            return hero;
          })
        );
    }

    return this.http.put<HeroModel>(
      `${this.URL}/heroes/${hero.id}.json`,
      heroTemp
    );
  }
  getHeroes() {
    return this.http
      .get<HeroFirebase>(`${this.URL}/heroes.json`)
      .pipe(map(this.heroesObjToArray));
  }

  getHero(id: string) {
    return this.http.get<HeroModel>(`${this.URL}/heroes/${id}.json`).pipe(
      map((resp) => {
        if (!resp) return null;

        resp.id = id;
        return resp;
      })
    );
  }

  deleteHeroe(id: string) {
    return this.http.delete(`${this.URL}/heroes/${id}.json`);
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
