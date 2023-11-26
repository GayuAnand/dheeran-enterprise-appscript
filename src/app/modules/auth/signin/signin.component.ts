import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseComponent } from './../../../../../src/app/common';

@Component({
  selector: 'de-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./../../../../reusable-styles/page-component.scss', './signin.component.scss'],
})
export class SignInComponent extends BaseComponent {
  signInForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  showPassword = false;

  constructor() {
    super();
    (window as any)['s'] = this;
  }

  onFormSubmit() {
    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;
      this.apiServices.auth
        .signIn(username as string, password as string)
        .subscribe(() => {
          console.log('Sign in successful');
          this.router.navigate(['/app']);
        });
    }
  }
}
