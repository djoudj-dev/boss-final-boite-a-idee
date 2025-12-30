import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IdeaForm } from './components/idea-form';
import { IdeaList } from './components/idea-list';
import { IdeaInMemory } from './services/idea-in-memory';
import { CreateIdeaPayload } from './models/idea';

@Component({
  selector: 'app-root',
  imports: [IdeaForm, IdeaList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <h1>🎯 Boîte à Idées</h1>
    </header>

    <app-idea-form (ideaSubmitted)="createIdea($event)" />

    <app-idea-list [ideas]="ideaService.ideas()" (archiveIdea)="archiveIdea($event)" />
  `,
  styles: `
  :host {
    display: block;
    max-width: 50rem;
    margin: 0 auto;
    padding: 2rem 1rem;

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

  protected createIdea(ideaData: CreateIdeaPayload): void {
    this.ideaService.addIdea(ideaData);
  }

  protected archiveIdea(ideaId: string): void {
    this.ideaService.archiveIdea(ideaId);
  }
}
