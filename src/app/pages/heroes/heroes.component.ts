import { Component, OnInit } from '@angular/core';
import { HeroModel } from 'src/app/models/hero.model';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [],
})
export class HeroesComponent implements OnInit {
  heroes: HeroModel[] = [];
  loading = false;
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  removeHero(index: number, id: string = '') {
    this.heroService.deleteHeroe(id).subscribe((resp) => {
      this.heroes.splice(index, 1);
    });
  }

  loadHeroes() {
    this.loading = true;
    this.heroService.getHeroes().subscribe((resp) => {
      this.heroes = resp;
      this.loading = false;
    });
  }
}
