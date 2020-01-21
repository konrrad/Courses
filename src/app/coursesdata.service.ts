import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CourseCl } from './courseclass';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CoursesdataService {
  private coursesPath = '/courses';
  private usersPath = '/users';
  private listOfCourses: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {
    this.listOfCourses = this.firebase.list(this.coursesPath);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCoursesFromDataBase(): AngularFireList<CourseCl> {
    return this.listOfCourses;
  }

  addCourseToDataBase(course: CourseCl): void {
    this.listOfCourses.push(course);
  }

  updateCourseInDataBase(key: string, newRating: number, newRateNumber: number): void {
    this.firebase.database.ref(`${this.coursesPath}/${key}/rating`).set(newRating);
    this.firebase.database.ref(`${this.coursesPath}/${key}/ratenumber`).set(newRateNumber);
  }

  deleteCourseFromDataBase($key: string): void {
    this.listOfCourses.remove($key);
  }

  signStudentToCourseInDataBase(key: string, newSignedStudents) {
    this.firebase.database.ref(`${this.coursesPath}/${key}/signedStudents`).set(newSignedStudents);
  }

  getCourseFromDataBase(key: string) {
    return this.firebase.object(`${this.coursesPath}/${key}`);
  }

  getCourseFromUserDataBase(uid: string, key: string){  
    return this.firebase.object(`${this.usersPath}/${uid}/userCourses/${key}`);
  }

  changeCourseNameInDataBase(key: string, newName: string) {
    this.firebase.database.ref(`${this.coursesPath}/${key}/name`).set(newName);
  }

  changeCourseECTSInDataBase(key: string, newECTS: number) {
    this.firebase.database.ref(`${this.coursesPath}/${key}/ects`).set(newECTS);
  }

  changeCourseSemesterInDataBase(key: string, newSemester: number) {
    this.firebase.database.ref(`${this.coursesPath}/${key}/semester`).set(newSemester);
  }

  changeCourseLectureInDataBase(key: string, newBool: boolean) {
    this.firebase.database.ref(`${this.coursesPath}/${key}/lecture`).set(newBool);
  }

  changeCourseExInDataBase(key: string, newBool: boolean) {
    this.firebase.database.ref(`${this.coursesPath}/${key}/ex`).set(newBool);
  }

  changeCourseLabsInDataBase(key: string, newBool: boolean) {
    this.firebase.database.ref(`${this.coursesPath}/${key}/labs`).set(newBool);
  }

  changeCourseProjInDataBase(key: string, newBool: boolean) {
    this.firebase.database.ref(`${this.coursesPath}/${key}/proj`).set(newBool);
  }

  changeCourseStudentsInDataBase(key: string, newStudentsNumber: number) {
    this.firebase.database.ref(`${this.coursesPath}/${key}/students`).set(newStudentsNumber);
  }
}
