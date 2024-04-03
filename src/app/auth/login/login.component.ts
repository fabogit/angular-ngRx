import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Store } from "@ngrx/store";
import { noop } from "rxjs";
import { tap } from "rxjs/operators";

import { AuthService } from "../auth.service";

import { AppState } from "../reducers";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: ["test@angular-university.io", [Validators.required]],
      password: ["test", [Validators.required]],
    });
  }

  ngOnInit() { }

  login() {
    type FormValue = { email: string; password: string; };
    const formValue: FormValue = this.form.value;

    this.auth.login(formValue.email, formValue.password)
      .pipe(
        // Store logged user and navigate to homepage
        tap(
          user => {
            console.log(user);

            // TODO
            this.store.dispatch(action);

            this.router.navigateByUrl('/courses');
          }
        )
      )
      .subscribe(
        noop,
        () => alert('Login failed')
      );

  }
}
