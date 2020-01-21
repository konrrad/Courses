import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appTitle = 'Computer Science Courses';
  isLogged$: Observable<boolean>;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLogged$=this.auth.authState$;
  }
  logout()
  {
    this.auth.logout().then(()=>this.router.navigate(['login']));
  }
}
