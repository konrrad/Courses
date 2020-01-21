import { Pipe, PipeTransform } from '@angular/core';
import { CourseCl } from './courseclass';
import { SearchCourseComponent } from './search-course/search-course.component';


@Pipe({
  name: 'searchByName'
})
export class SearchPipeByName implements PipeTransform {

  transform(courses: CourseCl[], searchText: string): CourseCl[] {
    if (!courses) {
      return [];
    }
    if (!searchText) {
      return courses;
    }

    console.log(courses);
    searchText = searchText.toLowerCase();
    return courses.filter(course => {
      return course.name.toLowerCase().includes(searchText);
    });
  }

}

@Pipe({
  name: 'searchByECTS'
})
export class SearchPipeByECTS implements PipeTransform {

  transform(courses: CourseCl[], searchECTS: number): CourseCl[] {
    if (!courses) {
      return [];
    }
    if (!searchECTS) {
      return courses;
    }

    return courses.filter(course => {
      if (course.ects == searchECTS) {
        return course;
      }
    });
  }

}

@Pipe({
  name: 'searchBySemester'
})
export class SearchPipeBySemester implements PipeTransform {

  transform(courses: CourseCl[], searchSemester: number): CourseCl[] {
    if (!courses) {
      return [];
    }
    if (!searchSemester) {
      return courses;
    }

    return courses.filter(course => {
      if (course.semester == searchSemester) {
        return course;
      }
    });
  }

}

@Pipe({
  name: 'searchByStudents'
})
export class SearchPipeByStudents implements PipeTransform {

  transform(courses: CourseCl[], searchStudents: number): CourseCl[] {
    if (!courses) {
      return [];
    }
    if (!searchStudents) {
      return courses;
    }

    return courses.filter(course => {
      if (course.students == searchStudents) {
        return course;
      }
    });
  }

}

@Pipe({
  name: 'searchByMinRating'
})
export class SearchPipeByMinRating implements PipeTransform {

  transform(courses: CourseCl[], searchMinRating: number): CourseCl[] {
    if (!courses) {
      return [];
    }
    if (!searchMinRating) {
      return courses;
    }

    return courses.filter(course => {
      if (course.rating >= searchMinRating) {
        return course;
      }
    });
  }

}

@Pipe({
  name: 'searchByMaxRating'
})
export class SearchPipeByMaxRating implements PipeTransform {

  transform(courses: CourseCl[], searchMaxRating: number): CourseCl[] {
    if (!courses) {
      return [];
    }
    if (!searchMaxRating) {
      return courses;
    }

    return courses.filter(course => {
      if (course.rating <= searchMaxRating) {
        return course;
      }
    });
  }

}

@Pipe({
  name: 'coursePagination'
})
export class PaginationPipe implements PipeTransform {

  transform(courses: CourseCl[], page: number, toDisplayNumber: number): CourseCl[] {
    if (!courses) {
      return [];
    }

    const displayCourses = [];
    const startDisplayNumber = ( page - 1 ) * toDisplayNumber;
    const min = startDisplayNumber;
    let max  = 0;

    if ( courses.length - startDisplayNumber >= toDisplayNumber ) {
      max = +startDisplayNumber + +toDisplayNumber;
    } else {
      max = +startDisplayNumber + +courses.length % +toDisplayNumber;
    }

    for ( let i = min ; i < max ; i = i + 1 ) {
      displayCourses.push(courses[i]);
    }

    return displayCourses;
  }

}
