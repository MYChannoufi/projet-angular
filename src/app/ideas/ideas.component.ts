import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Idea } from '../models/Idea';
import { IdeaService } from '../services/idea.service';

@Component({
  selector: 'app-ideas',
  standalone: false,
  templateUrl: './ideas.component.html',
  styleUrl: './ideas.component.css'
})
export class IdeasComponent implements OnInit {
  ideas: Idea[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private ideaService: IdeaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadIdeas();
  }

  loadIdeas(): void {
    this.loading = true;
    this.error = null;
    this.ideaService.getIdeas().subscribe({
      next: (ideas) => {
        this.ideas = ideas;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des idées';
        this.loading = false;
        console.error('Erreur:', error);
      }
    });
  }

  likeIdea(idea: Idea): void {
    this.ideaService.likeIdea(idea).subscribe({
      next: (updatedIdea) => {
        const index = this.ideas.findIndex(i => i.id === updatedIdea.id);
        if (index !== -1) {
          this.ideas[index] = updatedIdea;
        }
      },
      error: (error) => {
        console.error('Erreur lors du like:', error);
        alert('Erreur lors de la mise à jour des likes');
      }
    });
  }

  deleteIdea(ideaId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette idée ?')) {
      this.loading = true;
      this.ideaService.deleteIdea(ideaId).subscribe({
        next: () => {
          this.ideas = this.ideas.filter(idea => idea.id !== ideaId);
          this.loading = false;
          alert('Idée supprimée avec succès');
        },
        error: (error) => {
          this.loading = false;
          console.error('Erreur lors de la suppression:', error);
          if (error.status === 404) {
            alert('L\'idée n\'existe plus');
          } else {
            alert('Erreur lors de la suppression de l\'idée');
          }
        }
      });
    }
  }

  viewDetails(ideaId: number): void {
    this.router.navigate(['/ideas', ideaId]);
  }

  getTotalIdeas(): number {
    return this.ideas.length;
  }

  getMostLikedIdea(): Idea | null {
    if (this.ideas.length === 0) return null;
    return this.ideas.reduce((prev, current) => 
      (prev.likes > current.likes) ? prev : current
    );
  }
}
