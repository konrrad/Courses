import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListofcoursesComponent } from './listofcourses.component';

describe('ListofcoursesComponent', () => {
  let component: ListofcoursesComponent;
  let fixture: ComponentFixture<ListofcoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListofcoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofcoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
