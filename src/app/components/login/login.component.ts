import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/Auth/auth.Actions';
import { IAuthState } from 'src/app/store/Auth/auth.Reducer';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;
  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private store: Store<{ auth: IAuthState }>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(s => s.auth.isLoadingLogin);
  }

  public onSubmit() {
    this.store.dispatch(login({ username: this.userForm.value.email, password: this.userForm.value.password }));

    // this.isLoading = true;
    // this.auth.login(this.email, this.pass).subscribe(
    //   isAuth => {
    //     this.isLoading = false;
    //     if (isAuth) {
    //       if (isAuth.Roles.indexOf("Cook") > -1) {
    //         this.router.navigate(['/kitchen']);
    //       }

    //       else if (isAuth.Roles.indexOf("Bartender") > -1) {
    //         this.router.navigate(['/bar']);
    //       }

    //       else
    //         this.router.navigate(['/']);
    //     }
    //   },
    //   err => { this.isLoading = false; console.log(err); });
  }
}
