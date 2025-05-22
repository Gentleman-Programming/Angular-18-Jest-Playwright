import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor, *ngIf, etc.
// import { MarvelService } from '../services/marvel.service'; // Descomentar si creamos un servicio

interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

@Component({
  selector: 'app-marvel-characters',
  standalone: true, // Asumiendo que usamos componentes standalone
  imports: [CommonModule], // Necesario para directivas comunes en standalone
  templateUrl: './marvel-characters.component.html',
  styleUrls: ['./marvel-characters.component.scss']
})
export class MarvelCharactersComponent implements OnInit {
  characters: MarvelCharacter[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // marvelService = inject(MarvelService); // Descomentar si creamos un servicio

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.isLoading = true;
    this.errorMessage = null;

    // --- Datos Mockeados Temporalmente ---
    // En un caso real, llamarías a this.marvelService.getCharacters()
    // que devolvería un Observable.
    setTimeout(() => { // Simular llamada a API
      this.characters = [
        { id: 1009610, name: 'Spider-Man', description: 'Bitten by a radioactive spider, Peter Parker’s arachnid abilities give him amazing powers he uses to help others, while his personal life continues to offer plenty of obstacles.', thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b', extension: 'jpg' } },
        { id: 1009368, name: 'Iron Man', description: 'Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity.', thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55', extension: 'jpg' } },
        { id: 1009220, name: 'Captain America', description: 'Vowing to serve his country any way he could, young Steve Rogers took the super soldier serum to become America\'s one-man army. Fighting for the red, white and blue for over 60 years, Captain America is the living, breathing symbol of freedom and liberty.', thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087', extension: 'jpg' } },
        { id: 1009664, name: 'Thor', description: 'As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he\'s quite smart and compassionate.', thumbnail: { path: 'http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350', extension: 'jpg' } }
      ];
      this.isLoading = false;
    }, 1000);
    // --- Fin de Datos Mockeados ---

    /* Ejemplo con servicio:
    this.marvelService.getCharacters().subscribe({
      next: (data) => {
        this.characters = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load characters.';
        console.error(err);
        this.isLoading = false;
      }
    });
    */
  }

  getThumbnailUrl(character: MarvelCharacter): string {
    return `${character.thumbnail.path}.${character.thumbnail.extension}`;
  }
}
