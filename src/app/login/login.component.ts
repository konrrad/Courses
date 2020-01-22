import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
 };
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  registered: boolean = false;

  login() {
    this.authService.login(this.credentials).then(() => this.router.navigate(['/home']))
    .catch((err) => {alert(err.message);});
  }
  register() {
    this.authService.register(this.credentials)
      .then(() => {this.registered = true; } )
      . catch ((err) => {alert(err.message); }).then(()=>this.router.navigate(['/home']));
  }

}
