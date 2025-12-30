import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateIdeaPayload } from '../models/idea';

type IdeaFormValue = {
  title: FormControl<string>;
  description: FormControl<string>;
};

@Component({
  selector: 'app-idea-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>💡 Nouvelle idée</h2>

    <form [formGroup]="ideaForm" (ngSubmit)="onSubmit()">
      <div class="field">
        <label for="title"> Titre <span class="required">*</span> </label>
        <input
          id="title"
          type="text"
          formControlName="title"
          placeholder="Ex: Cadeau pour maman"
        />
        @if (ideaForm.controls.title.invalid && ideaForm.controls.title.touched) {
        <p class="error">Le titre est requis (min. 3 caractères)</p>
        }
      </div>

      <div class="field">
        <label for="description"> Description <span class="required">*</span> </label>
        <textarea
          id="description"
          formControlName="description"
          rows="4"
          placeholder="Décris ton idée..."
        ></textarea>
        @if (ideaForm.controls.description.invalid && ideaForm.controls.description.touched) {
        <p class="error">La description est requise (min. 10 caractères)</p>
        }
      </div>

      <button type="submit" [disabled]="ideaForm.invalid">✨ Ajouter l'idée</button>
    </form>
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

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 500;
    }

    .required {
      color: var(--error);
    }

    input,
    textarea {
      padding: 0.75rem;
      border: 2px solid var(--secondary);
      border-radius: 8px;
      font-family: inherit;
      font-size: 1rem;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: var(--primary);
    }

    textarea {
      resize: vertical;
    }

    .error {
      font-size: 0.875rem;
      color: var(--error);
    }

    button {
      padding: 0.75rem;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }

    button:hover:not(:disabled) {
      background: var(--accent);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  `,
})
export class IdeaForm {
  readonly ideaSubmitted = output<CreateIdeaPayload>();

  protected readonly ideaForm = new FormGroup<IdeaFormValue>({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  onSubmit(): void {
    if (this.ideaForm.valid) {
      this.ideaSubmitted.emit(this.ideaForm.getRawValue());
      this.ideaForm.reset();
    }
  }
}
