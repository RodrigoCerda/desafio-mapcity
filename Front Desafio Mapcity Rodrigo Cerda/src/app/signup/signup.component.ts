import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapService, AuthenticationService } from '@app/_services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  returnUrl: string = '/';
  loading: boolean = false;
  error: boolean = false;
  addressError: boolean = false;
  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private map: MapService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService)  { }

  ngOnInit() {
     this.registerForm = this.formBuilder.group({
         nameInput: ['', Validators.required],
         emailInput: ['', [Validators.required, Validators.email]],
         passwordInput: ['', [Validators.required, Validators.minLength(6)]],
         repeatPasswordInput: ['', Validators.required],
     }, {
         validator: (formGroup) => (formGroup.controls['passwordInput'].value == formGroup.controls['repeatPasswordInput'].value)
     });
  }
  get form() { return this.registerForm.controls; }

  submitUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const searchResult = JSON.parse(this.map.geocoder.lastSelected);
    if (searchResult == null) {
      this.addressError = true;
      return
    }
    const point = {
      'type': 'Feature',
      'geometry': searchResult.geometry,
      'properties': {
        'title': searchResult.place_name
      }
    }
    const signupData = {
      name: this.form.nameInput.value,
      email: this.form.emailInput.value,
      password: this.form.passwordInput.value,
      point
    }
    this.auth.register(signupData.name, signupData.password, signupData.email, point)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.error = error;
              this.loading = false;
          });
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
