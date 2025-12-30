import { computed, Injectable, signal } from '@angular/core';
import { CreateIdeaPayload, Idea } from '../models/idea';

@Injectable({
  providedIn: 'root',
})
export class IdeaInMemory {
  private readonly _ideas = signal<Idea[]>([]);

  readonly ideas = computed(() => {
    const allIdeas = this._ideas();
    return allIdeas.slice().sort((a, b) => {
      if (a.status === 'IDEA' && b.status === 'ARCHIVED') return -1;
      if (a.status === 'ARCHIVED' && b.status === 'IDEA') return 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  });

  readonly ideasCount = computed(() => this._ideas().length);

  readonly activeIdeasCount = computed(() => this._ideas().filter((idea) => idea.status === 'IDEA').length);

  readonly archivedIdeasCount = computed(() => this._ideas().filter((idea) => idea.status === 'ARCHIVED').length);

  addIdea(ideaPayload: CreateIdeaPayload): void {
    const newIdea: Idea = {
      id: crypto.randomUUID(),
      status: 'IDEA',
      createdAt: new Date(),
      ...ideaPayload,
    };

    this._ideas.update((ideas) => [newIdea, ...ideas]);
  }

  archiveIdea(ideaId: string): void {
    this._ideas.update((ideas) =>
      ideas.map((idea) => (idea.id === ideaId ? { ...idea, status: 'ARCHIVED' as const } : idea))
    );
  }
}
