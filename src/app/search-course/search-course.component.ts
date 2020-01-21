import { Component, OnInit, } from '@angular/core';
import { CoursesdataService } from './../coursesdata.service';
import { CourseCl } from '../courseclass';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent implements OnInit {
  public courses = [];

  constructor(private courseService: CoursesdataService) {
  }

  ngOnInit() {
    this.getCourses();
  }

  searching() {
    console.log('Trwa wyszukiwanie!');
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
}
