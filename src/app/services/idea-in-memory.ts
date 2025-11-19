import { computed, Injectable, Signal, signal } from '@angular/core';
import { CreateIdeaDto, Idea } from '../models/idea-interface';

@Injectable({
  providedIn: 'root',
})
export class IdeaInMemory {
  private readonly ideas = signal<Idea[]>([]);

  addIdea(ideaDto: CreateIdeaDto): void {
    const newIdea: Idea = {
      id: crypto.randomUUID(),
      title: ideaDto.title,
      description: ideaDto.description,
      status: 'IDEA',
      createdAt: new Date(),
    };

    this.ideas.update((ideas) => [newIdea, ...ideas]);
  }

  archiveIdea(ideaId: string): void {
    this.ideas.update((ideas) =>
      ideas.map((idea) => (idea.id === ideaId ? { ...idea, status: 'ARCHIVED' as const } : idea))
    );
  }

  getIdeas(): Signal<Idea[]> {
    return computed(() => {
      const allIdeas = this.ideas();
      return allIdeas.slice().sort((a, b) => {
        if (a.status === 'IDEA' && b.status === 'ARCHIVED') return -1;
        if (a.status === 'ARCHIVED' && b.status === 'IDEA') return 1;
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    });
  }

  getIdeasCount(): Signal<number> {
    return computed(() => this.ideas().length);
  }

  getActiveIdeasCount(): Signal<number> {
    return computed(() => this.ideas().filter((idea) => idea.status === 'IDEA').length);
  }

  getArchivedIdeasCount(): Signal<number> {
    return computed(() => this.ideas().filter((idea) => idea.status === 'ARCHIVED').length);
  }
}
