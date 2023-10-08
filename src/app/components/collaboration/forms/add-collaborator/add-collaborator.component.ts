import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  AutocompleteDataSourceItem,
  NzAutocompleteModule,
} from 'ng-zorro-antd/auto-complete';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-collaborator',
  standalone: true,
  imports: [CommonModule, NzInputModule, NzAutocompleteModule, FormsModule],
  template: `
    <div>
      <input
        placeholder="Search For People"
        nz-input
        [(ngModel)]="inputValue"
        (input)="onInput($event)"
        [nzAutocomplete]="auto"
      />
      <nz-autocomplete #auto>
        <nz-auto-option
          *ngFor="let collaborator of collaborators"
          [nzValue]="collaborator.label"
        >
          {{ collaborator.label }}
        </nz-auto-option>
      </nz-autocomplete>
    </div>
  `,
  styles: [``],
})
export class AddCollaboratorComponent {
  private data = inject(NZ_MODAL_DATA);
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);
  collaborators!: AutocompleteDataSourceItem[];
  inputValue: string = '';
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log(this.inputValue);
    if (this.inputValue !== '') {
      this.httpClient
        .get<{ email: string; id: string; name: string }[]>(
          `${environment.baseUrl}/projects/${this.data.projectId}/collaborators?searchQuery=${value}`
        )
        .subscribe({
          next: (value) => {
            this.collaborators = value
              .filter((i) => i.email != this.authService.getUser().email)
              .map((i) => ({
                label: i.email,
                value: i.id,
              }));
          },
        });
    }
  }
}
