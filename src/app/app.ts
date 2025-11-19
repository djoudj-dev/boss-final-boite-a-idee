import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IdeaForm } from './components/idea-form/idea-form';
import { IdeaList } from './components/idea-list/idea-list';
import { IdeaInMemory } from './services/idea-in-memory';
import { CreateIdeaDto } from './models/idea-interface';

@Component({
  selector: 'app-root',
  imports: [IdeaForm, IdeaList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <header>
        <h1>🎯 Boîte à Idées</h1>
      </header>

      <app-idea-form (ideaSubmitted)="handleIdeaSubmitted($event)" />

      <app-idea-list [ideas]="ideaService.getIdeas()()" (archiveIdea)="handleArchiveIdea($event)" />
    </div>
  `,
  styles: `
  :host {
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    header {
      text-align: center;
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 2rem;
      color: var(--primary);
    }
  }
  `,
})
export class App {
  protected readonly ideaService = inject(IdeaInMemory);

  protected handleIdeaSubmitted(ideaData: CreateIdeaDto): void {
    this.ideaService.addIdea(ideaData);
  }

  protected handleArchiveIdea(ideaId: string): void {
    this.ideaService.archiveIdea(ideaId);
  }
}
