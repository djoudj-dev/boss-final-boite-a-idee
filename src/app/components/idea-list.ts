import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Idea } from '../models/idea';

@Component({
  selector: 'app-idea-list',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let _ideas = ideas();

    <h2>📝 Mes idées ({{ ideas().length }})</h2>

    @if (_ideas.length === 0) {
    <p class="empty">Aucune idée pour le moment</p>
    } @else {
    <div class="grid">
      @for (idea of _ideas; track idea.id) {
      <article class="idea" [class.archived]="idea.status === 'ARCHIVED'">
        <h3>{{ idea.title }}</h3>
        <p>{{ idea.description }}</p>

        <footer>
          <time>{{ idea.createdAt | date : 'dd/MM/yyyy' }}</time>
          @if (idea.status !== 'ARCHIVED') {
          <button (click)="onArchive(idea.id)">📦 Archiver</button>
          }
        </footer>
      </article>
      }
    </div>
    }
  `,
  styles: `
  :host {
    display: block;
    background: white;
    border: 2px solid var(--primary);
    border-radius: 12px;
    padding: 1.5rem;
    margin-top: 1rem;

    h2 {
      margin-bottom: 1.5rem;
      color: var(--text);
    }

    .empty {
      text-align: center;
      padding: 2rem;
      color: var(--accent);
    }

    .grid {
      display: grid;
      gap: 1rem;
    }

    .idea {
      padding: 1rem;
      background: var(--bg);
      border: 2px solid var(--secondary);
      border-radius: 8px;
    }

    .idea.archived {
      opacity: 0.5;
    }

    .idea h3 {
      margin-bottom: 0.5rem;
      color: var(--primary);
    }

    .idea.archived h3 {
      text-decoration: line-through;
    }

    .idea p {
      font-size: 0.875rem;
      color: var(--text);
      margin-bottom: 1rem;
    }

    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.75rem;
      border-top: 1px solid var(--secondary);
    }

    time {
      font-size: 0.875rem;
      color: var(--accent);
    }

    button {
      padding: 0.5rem 1rem;
      background: var(--secondary);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 0.875rem;
      cursor: pointer;
    }

    button:hover {
      background: var(--accent);
    }

    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  `,
})
export class IdeaList {
  readonly ideas = input.required<Idea[]>();
  readonly archiveIdea = output<string>();

  protected onArchive(ideaId: string): void {
    this.archiveIdea.emit(ideaId);
  }
}
