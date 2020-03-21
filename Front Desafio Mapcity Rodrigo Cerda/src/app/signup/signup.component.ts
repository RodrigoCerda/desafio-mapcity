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
  nameInput: string = '';
  emailInput: string = '';
  passwordInput: string = '';
  direccionInput: string ='';
  returnUrl: string = '/';
  loading = false;
  error = '';
  constructor(private map: MapService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService)  { }

  ngOnInit() {
  }
  submitUser() {
    const searchResult = JSON.parse(this.map.geocoder.lastSelected);
    console.log(searchResult);
    console.log(this.map.geocoder)
    const point = {
      'type': 'Feature',
      'geometry': searchResult.geometry,
      'properties': {
        'title': searchResult.place_name
      }
    }
    const signupData = {
      name: this.nameInput,
      email: this.emailInput,
      password: this.passwordInput,
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
}
