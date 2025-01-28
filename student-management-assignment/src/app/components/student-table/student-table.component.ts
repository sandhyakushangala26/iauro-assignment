import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { IStudentFormDetails } from '../model-interface/student-model';

@Component({
  selector: 'app-student-table',
  imports: [MatTableModule, CommonModule],
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.scss',
})
export class StudentTableComponent implements OnChanges {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'gender',
    'address',
    'termsConditions',
  ];
  @Input() students!: IStudentFormDetails[];
  @Output() editStudentEvent = new EventEmitter();
  @Output() deleteStudentRecordEvent = new EventEmitter();
  dataSource: any;
  afterDeleteList: any;
  constructor(private dialog: MatDialog) {}

  ngOnChanges(data: SimpleChanges) {
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
        this.students = this.students.filter(
          (ele: any) => ele.rollNumber !== studentInfo.rollNumber
        );
        this.deleteStudentRecordEvent.next([...this.students]);
      }
    });
  }
}
