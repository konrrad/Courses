import { CoursesdataService } from './../coursesdata.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CourseCl } from '../courseclass';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent {
  constructor(
    private fb: FormBuilder,
    private courseService: CoursesdataService,
  ) {}

  @Output() courseEvent = new EventEmitter<CourseCl>();
  createCourseForm = this.fb.group({
    name: ['', Validators.required],
    ects: ['', Validators.required],
    semester: ['', Validators.required],
    lecture: false,
    ex: false,
    labs: false,
    proj: false,
    students: ['', Validators.required],
    img: ['', Validators.required]
  });

  onSubmit(): void {
    const newCourse: CourseCl = Object.assign(
      { rating: 0 },
      { ratenumber: 0},
      { signedStudents: 0},
      this.createCourseForm.value
    );

    this.courseService.addCourseToDataBase(newCourse);
  }
}
