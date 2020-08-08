import { Component } from '@angular/core';
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
  showAdminBoard = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;

      this.showAdminBoard = this.role === 1;

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.logout();
    window.location.reload();
  }
}
