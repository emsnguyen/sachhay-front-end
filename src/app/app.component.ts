import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from './_service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sachhay-front-end';
  private role: number;
  isLoggedIn = false;
  isAdmin = false;
  username: string;
  searchForm:FormGroup;

  constructor(private tokenStorageService: TokenStorageService,
    private fb:FormBuilder,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;

      this.isAdmin = this.role === 1;

      this.username = user.username;
      this.searchForm = this.fb.group(
        {
          q: ['', Validators.compose([Validators.required])]
        }
      )
    }
  }

  logout(): void {
    this.tokenStorageService.logout();
    window.location.reload();
  }

  searchBook() {
    this.router.navigate(['/books'], { queryParams: { q: this.q.value }});
  }

  get q() {
    return this.searchForm.get('q');
  }
}
