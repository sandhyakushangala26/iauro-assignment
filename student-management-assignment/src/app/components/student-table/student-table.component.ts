import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-student-table',
  imports: [MatTableModule, CommonModule],
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.scss',
})
export class StudentTableComponent {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'gender',
    'address',
    'termsConditions',
  ];
  @Input() students!: any;
  @Output() editStudentEvent = new EventEmitter();
  @Output() deleteStudentRecordEvent = new EventEmitter();
  dataSource: any;
  afterDeleteList: any;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.students.flat());
  }

  onEdit(studentDetails: any) {
    this.editStudentEvent.emit(studentDetails);
  }

  onDelete(studentInfo: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { name: `${studentInfo.firstName} ${studentInfo.lastName}` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.afterDeleteList = this.students.filter(
          (ele: any) => ele.rollNumber !== studentInfo.rollNumber
        );
        this.deleteStudentRecordEvent.next([...this.afterDeleteList]);
      }
    });
  }
}
