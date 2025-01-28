import { Component, ViewChild } from '@angular/core';
import { StudentDetailsFormComponent } from './components/student-details-form/student-details-form.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { CommonModule } from '@angular/common';
import { IStudentFormDetails } from './components/model-interface/student-model';

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
  students!: IStudentFormDetails[];

  addStudent(student: IStudentFormDetails[]) {
    this.students = [...student];
  }

  editStudent(studentData: any) {
    this.StudentDetailsFormComponent.scrollToForm();
    this.StudentDetailsFormComponent.patchFormData(studentData);
  }

  deleteStudent(studentData: IStudentFormDetails[]) {
    this.students = studentData;
  }
}
