import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Idea } from '../models/Idea';
import { IdeaService } from '../services/idea.service';

@Component({
  selector: 'app-add-idea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-idea.component.html',
  styleUrl: './add-idea.component.css'
})
export class AddIdeaComponent implements OnInit {
  ideaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ideaService: IdeaService
  ) {
    this.ideaForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      likes: [0]
    });
  }

  ngOnInit(): void {
    // Le formulaire est déjà initialisé dans le constructeur
  }

  onSubmit(): void {
    if (this.ideaForm.valid) {
      const newIdea: Idea = {
        id: 0, // L'ID sera généré par le serveur
        title: this.ideaForm.get('title')?.value,
        description: this.ideaForm.get('description')?.value,
        date: this.ideaForm.get('date')?.value,
        likes: 0
      };

      this.ideaService.addIdea(newIdea).subscribe({
        next: () => {
          this.router.navigate(['/ideas']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de l\'idée:', error);
          alert('Erreur lors de l\'ajout de l\'idée');
        }
      });
    }
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get title() { return this.ideaForm.get('title'); }
  get description() { return this.ideaForm.get('description'); }
}
