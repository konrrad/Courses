import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {User, SignedFor } from './login/user'
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
export interface Credentials {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState$: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
    public firebase: AngularFireDatabase) {
      this.authState$=this.afAuth.authState;
     }

  login({email,password}: Credentials)
  {
    
    this.afAuth.auth.setPersistence("session");
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }

  user()
  {
    return this.afAuth.auth.currentUser;
  }

  public getUserData()
  {
    return this.firebase.object(`/users/`+this.user().uid);
    // return this.firebase.database.ref(`/users/`+this.user().uid+'/roles');
  }

  register({email,password}: Credentials)
  {
    this.afAuth.auth.setPersistence("session");
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(credential=>this.updateRegisteredUserData(credential.user));
  }

  logout()
  {
    return this.afAuth.auth.signOut();
  }

  updateRegisteredUserData(user)
  {
    const uid=user.uid;
    const courses: SignedFor[]= [];
    const rootRef=this.firebase.database.ref();
    rootRef.child(`users/`+uid).set(
      {
          
          email: user.email,
          roles:
          {
          subscriber: true,
          admin: false
          },
          userCourses: courses,
      
    } 
    );
  }
  
  getUID() : string | null
  {
    return this.afAuth.auth.currentUser.uid;
  }


}
