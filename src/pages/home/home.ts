import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ANIMALES} from '../../data/data.animales';
import {Animal} from '../../interfaces/animal.interface';
import {Refresher, reorderArray} from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[]=[];
  audio = new Audio();
  audio_tiempo:any;
  ordenando:boolean = false;

  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal:Animal){
    console.log(animal);
    this.pausarAudio(animal);

    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }
    this.audio.src= animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;

    this.audio_tiempo = setTimeout(()=> animal.reproduciendo = false, animal.duracion * 1000)

  }

  private pausarAudio(animalSeleccionado:Animal){
    clearTimeout(this.audio_tiempo);
    this.audio.pause();
    this.audio.currentTime = 0;
    for(let animal of this.animales){
      if(animal.nombre != animalSeleccionado.nombre){
        animal.reproduciendo = false;
      }
    }
  }

  borrarAnimal(idx){
    this.animales.splice(idx,1);
  }

  recargarAnimales(refresher:Refresher){
    setTimeout(() => {
      console.log('Async operation has ended');
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 1500);
  }

  reordenarAnimales(indices:any){
    console.log(indices);

    this.animales = reorderArray(this.animales, indices);

  }
}
