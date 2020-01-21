import { CourseCl } from '../courseclass';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesdataService } from '../coursesdata.service';
import { Location } from '@angular/common';
import { StarRatingComponent } from 'ng-starrating';
import { AuthService } from '../auth.service';
import { RateUser } from '../rateuser';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  private course: CourseCl;
  private courseKey: string;
  uid: string;
  isAdmin: boolean;
  userRating: number;
  userRate: RateUser;
  isFirstRating = false;
  signed: boolean;
  canSign: boolean;

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesdataService,
    private location: Location,
    private auth: AuthService) {
  }

  ngOnInit(): void {
    this.uid = this.auth.getUID();
    this.getCourse();
    this.getUserRating();
    this.checkIfAdmin();
  }

  checkIfAdmin(): void {
    this.auth.getUserData().snapshotChanges().subscribe(userSnapshot => {
      this.isAdmin = userSnapshot.payload.toJSON()['roles']['admin'];
    })
  }

  getCourse() {
    this.courseKey = this.route.snapshot.paramMap.get('$key');
    this.courseService.getCourseFromDataBase(this.courseKey).snapshotChanges().subscribe(courseSnapshot => {
      const crs = courseSnapshot.payload.toJSON();
      const loadValue = 'key';
      crs[loadValue] = courseSnapshot.key;
      this.course = crs as CourseCl;

      if(this.course.signedStudents >= this.course.students){
        this.canSign = false;
      } else {
        this.canSign = true;
      }
    });
    return this.courseKey;
  }

  getUserRating() {
    this.courseService.getCourseFromUserDataBase(this.uid, this.courseKey).snapshotChanges().subscribe(rateSnapshot => {
      const userRate = rateSnapshot.payload.toJSON();
      if (userRate == null) {
        this.isFirstRating = true;
        this.signed = false;
        this.userRating = 0;
        this.userRate = null;
      } else {
        this.signed = true;
        this.userRate = userRate as RateUser;
        this.userRating = this.userRate.userRating;

        if (this.userRating == 0) {
          this.isFirstRating = true;
        }
      }
    });
    
  }

  addRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}, course: CourseCl): void {
    const refToUser = this.auth.firebase.database.ref(`/users/` + this.uid);
    refToUser.child(`/userCourses/` + this.courseKey + `/userRating`).set($event.newValue);
    this.signed = true;

    if (this.isFirstRating) {
      this.isFirstRating = false;

      if (course.ratenumber === 0) {
        course.ratenumber ++;
        course.rating = $event.newValue;
      } else {
        course.ratenumber ++;
        course.rating = (course.rating * ( ( course.ratenumber - 1 ) / course.ratenumber ) + ( $event.newValue / course.ratenumber ));
      }

    } else {
      course.rating = (course.rating * course.ratenumber - $event.oldValue + $event.newValue) / course.ratenumber;
    }

    this.courseService.updateCourseInDataBase(this.courseKey, this.course.rating, this.course.ratenumber);
  }

  changeCourseName(newName: string) {
    this.course.name = newName;
    this.courseService.changeCourseNameInDataBase(this.courseKey, newName);
  }

  changeCourseECTS(newECTS: number) {
    this.course.ects = newECTS;
    this.courseService.changeCourseECTSInDataBase(this.courseKey, newECTS);
  }

  changeCourseSemester(newSemester: number) {
    this.course.semester = newSemester;
    this.courseService.changeCourseSemesterInDataBase(this.courseKey, newSemester);
  }

  changeCourseLecture() {
    this.course.lecture = !this.course.lecture;
    this.courseService.changeCourseLectureInDataBase(this.courseKey, this.course.lecture);
  }

  changeCourseEx() {
    this.course.ex = !this.course.ex;
    this.courseService.changeCourseExInDataBase(this.courseKey, this.course.ex);
  }

  changeCourseLabs() {
    this.course.labs = !this.course.labs;
    this.courseService.changeCourseLabsInDataBase(this.courseKey, this.course.labs);
  }

  changeCourseProj() {
    this.course.proj = !this.course.proj;
    this.courseService.changeCourseProjInDataBase(this.courseKey, this.course.proj);
  }

  changeCourseStudents(newStudentsNumber: number) {
    this.course.students = newStudentsNumber;
    this.courseService.changeCourseStudentsInDataBase(this.courseKey, this.course.students);
  }

  signFor() {
    if (!this.signed && this.course.signedStudents < this.course.students){
      const refToUser = this.auth.firebase.database.ref(`/users/` + this.uid);
      refToUser.child(`/userCourses/` + this.courseKey + `/userRating`).set(0);

      if (!this.signed) {
        this.course.signedStudents++;
        this.courseService.signStudentToCourseInDataBase(this.courseKey, this.course.signedStudents);
      }

      this.signed = true;
    }
  }

  comeBack(): void {
    this.location.back();
  }

  
}
