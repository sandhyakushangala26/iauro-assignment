import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentDetailsFormComponent } from './components/student-details-form/student-details-form.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [StudentDetailsFormComponent, StudentTableComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'student-management-assignment';
  @ViewChild(StudentDetailsFormComponent)
  StudentDetailsFormComponent!: StudentDetailsFormComponent;

  students: any[] = [];

  addStudent(student: any) {
    this.students.push(student);
  }

  editStudent(studentId: any) {
    console.log(studentId, 'catched the event in parent');
    const student = this.students[studentId];
    this.StudentDetailsFormComponent.patchFormData(student);
  }

  deleteStudent(index: any) {
    this.students.splice(index, 1);
  }
}
