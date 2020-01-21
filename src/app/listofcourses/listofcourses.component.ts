import { CourseCl } from '../courseclass';
import { CoursesdataService } from './../coursesdata.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../login/user';

@Component({
  selector: 'app-listofcourses',
  templateUrl: './listofcourses.component.html',
  styleUrls: ['./listofcourses.component.scss']
})
export class ListofcoursesComponent implements OnInit {
  public courses = [];
  public actualPageNumber = 1;
  public coursesToDisplayNumber = 10;
  public deleteButtonVisible: boolean;
  user: User;

  constructor(private courseService: CoursesdataService,
    private auth: AuthService) {}

  ngOnInit() {
    this.getCourses();
    this.canDelete();
  }

  getCourses() {
    this.courseService.getCoursesFromDataBase().snapshotChanges().forEach(coursesSnaphot => {
      this.courses = [];
      coursesSnaphot.forEach(coursesSnap => {
        const crs = coursesSnap.payload.toJSON();
        const loadKey = '$key';
        crs[loadKey] = coursesSnap.key;
        this.courses.push(crs as CourseCl);
      });
    });
  }

  deleteCourse(course: CourseCl) {
    this.courseService.deleteCourseFromDataBase(course.$key);
  }

  getCoursesToDisplayNumber(): number {
    if (!this.coursesToDisplayNumber) {
      return 10;
    }
    return +this.coursesToDisplayNumber;
  }

  getNumberOfPages(): number {
    return Math.floor( (+this.courses.length - 1) / +this.getCoursesToDisplayNumber() ) + 1;
  }

  setActualPageNumber(givenPageNumber: number): void {
    this.actualPageNumber = givenPageNumber;
  }

  setToDisplayNumber(coursesNumber: number): void {
    this.coursesToDisplayNumber = coursesNumber;
  }

  emptyArrayToIterate(numberOfElements: number): any {
    const buttons = Array<boolean>(numberOfElements);

    for ( let i = 0; i < numberOfElements; i = i + 1 ) {
      buttons[i] = false;
    }

    return buttons;
  }

  previousPage(): void {
    if (+this.actualPageNumber > 1) {
      this.actualPageNumber = +this.actualPageNumber - 1;
    }
  }

  nextPage(): void {
    if (+this.actualPageNumber < this.getNumberOfPages() ) {
      this.actualPageNumber = +this.actualPageNumber + 1;
    }
  }

  canDelete(): void {
    this.auth.getUserData().snapshotChanges().subscribe(userSnapshot => {
      this.deleteButtonVisible = userSnapshot.payload.toJSON()['roles']['admin'];
    })
  }
}
