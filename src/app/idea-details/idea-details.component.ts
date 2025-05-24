import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Idea } from '../models/Idea';
import { IdeaService } from '../services/idea.service';

@Component({
  selector: 'app-idea-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './idea-details.component.html',
  styleUrl: './idea-details.component.css'
})
export class IdeaDetailsComponent implements OnInit {
  idea: Idea | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ideaService: IdeaService
  ) {}

  ngOnInit(): void {
    this.loadIdea();
  }

  loadIdea(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.error = 'ID invalide';
      this.loading = false;
      return;
    }

    this.ideaService.getIdea(id).subscribe({
      next: (idea) => {
        this.idea = idea;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement de l\'idée';
        this.loading = false;
        console.error('Erreur:', error);
      }
    });
  }

  likeIdea(): void {
    if (this.idea) {
      this.ideaService.likeIdea(this.idea).subscribe({
        next: (updatedIdea) => {
          this.idea = updatedIdea;
        },
        error: (error) => {
          console.error('Erreur lors du like:', error);
          alert('Erreur lors de la mise à jour des likes');
        }
      });
    }
  }

  deleteIdea(): void {
    if (this.idea && confirm('Êtes-vous sûr de vouloir supprimer cette idée ?')) {
      this.ideaService.deleteIdea(this.idea.id).subscribe({
        next: () => {
          alert('Idée supprimée avec succès');
          this.router.navigate(['/ideas']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression de l\'idée');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/ideas']);
  }
}
