import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Project } from '../project.model';
import { ProjectsStore } from 'src/app/services/projects.store';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  private readonly dialogRef = inject(MatDialogRef);
  private readonly dialogData = inject<Project>(MAT_DIALOG_DATA);

  project = this.dialogData;

  onDelete(): void {
    this.dialogRef.close({ data: true });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
