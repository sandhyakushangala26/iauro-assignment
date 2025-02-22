import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  IStudentFormDetails,
  studentsSampleData,
} from '../model-interface/student-model';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-student-details-form',
  imports: [
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButtonModule,
  ],
  templateUrl: './student-details-form.component.html',
  styleUrl: './student-details-form.component.scss',
})
export class StudentDetailsFormComponent implements OnInit {
  studentForm!: FormGroup;
  studentDetails!: IStudentFormDetails[];
  editStudentDetail!: IStudentFormDetails;
  isStudentFormEditing: boolean = false;
  branchNames: string[] = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];

  filteredBranch!: Observable<string[]> | undefined;
  @Output() submitStudent = new EventEmitter<any>();
  @ViewChild('studentFormRef') studentFormElement!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      branch: new FormControl(''),
      termsConditions: new FormControl(false, [Validators.required]),
      dob: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.filteredBranch = this.studentForm.get('branch')?.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.studentDetails = studentsSampleData;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.branchNames.filter((branch: string) =>
      branch.toLowerCase().includes(filterValue)
    );
  }

  submitStudentForm() {
    if (this.studentForm.valid) {
      const newStudent: IStudentFormDetails = {
        rollNumber: !this.isStudentFormEditing
          ? this.studentDetails.length + 1
          : this.editStudentDetail.rollNumber,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        gender: this.gender.value,
        branch: this.branch.value,
        termsConditions: this.termsConditions.value,
        phone: this.phone.value,
        email: this.email.value,
        address: this.address.value,
      };

      !this.isStudentFormEditing && this.studentDetails.push(newStudent);

      if (this.isStudentFormEditing) {
        const index = this.studentDetails.findIndex(
          (student: IStudentFormDetails) =>
            student.rollNumber === this.editStudentDetail.rollNumber
        );
        if (index !== -1) {
          this.studentDetails[index] = newStudent;
        }
      }
      this.submitStudent.emit([...this.studentDetails]);
      this.studentForm.reset();
      this.isStudentFormEditing = false;
    }
  }

  scrollToForm(): void {
    this.isStudentFormEditing = true;
    this.studentFormElement.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
  }

  patchFormData(data: any) {
    this.editStudentDetail = data;
    this.studentForm.patchValue(data);
  }

  get firstName() {
    return this.studentForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.studentForm.get('lastName') as FormControl;
  }

  get gender() {
    return this.studentForm.get('gender') as FormControl;
  }

  get termsConditions() {
    return this.studentForm.get('termsConditions') as FormControl;
  }

  get branch() {
    return this.studentForm.get('branch') as FormRecord;
  }

  get email() {
    return this.studentForm.get('email') as FormControl;
  }

  get phone() {
    return this.studentForm.get('phone') as FormControl;
  }

  get address() {
    return this.studentForm.get('address') as FormControl;
  }
}
