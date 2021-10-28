import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroModel } from 'src/app/models/hero.model';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [],
})
export class HeroeComponent implements OnInit {
  hero: HeroModel = {
    name: '',
    skill: '',
    alive: true,
    id: '',
  };
  isSending = false;
  constructor(
    private heroService: HeroService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const param: string = this.router.snapshot.paramMap.get('id') || '';

    if (param === 'new') return;
    this.isSending = true;
    this.heroService.getHero(param).subscribe((resp) => {
      if (resp) {
        this.hero = resp;
      } else {
        alert('Heroe no encontrado');
      }

      this.isSending = false;
    });
  }

  add({ form }: NgForm) {
    if (form.invalid)
      return Object.values(form.controls).forEach((ctr) => ctr.markAsTouched());

    this.isSending = true;
    this.heroService.save(this.hero)?.subscribe((resp) => {
      this.isSending = false;
      console.log(resp);
      alert('Datos Agregados');
    });
  }
}
