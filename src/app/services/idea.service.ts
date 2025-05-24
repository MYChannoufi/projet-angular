import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Idea } from '../models/Idea';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getIdeas(): Observable<Idea[]> {
    return this.http.get<Idea[]>(`${this.apiUrl}/ideas`);
  }

  getIdea(id: number): Observable<Idea> {
    return this.http.get<Idea>(`${this.apiUrl}/ideas/${id}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération:', error);
        return throwError(() => error);
      })
    );
  }

  addIdea(idea: Idea): Observable<Idea> {
    return this.http.post<Idea>(`${this.apiUrl}/ideas`, idea).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout:', error);
        return throwError(() => error);
      })
    );
  }

  deleteIdea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ideas/${id}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la suppression:', error);
        return throwError(() => error);
      })
    );
  }

  likeIdea(idea: Idea): Observable<Idea> {
    return this.http.patch<Idea>(`${this.apiUrl}/ideas/${idea.id}`, { likes: idea.likes + 1 });
  }
} 