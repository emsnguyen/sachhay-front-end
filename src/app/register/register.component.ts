import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { TokenStorageService } from '../_service/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.user);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.errors;
        this.isSignUpFailed = true;
      }
    );
  }

}
