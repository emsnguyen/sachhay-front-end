import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './admin/dashboard/board-admin.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookManageComponent } from './admin/book-manage/book-manage/book-manage.component';
import { UserManageComponent } from './admin/user-manage/user-manage/user-manage.component';

const routes: Routes = [
  { path: 'books', component: HomeComponent },
  { path: 'books/create', component: BookCreateComponent },
  { path: 'books/edit/:id', component: BookEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'admin/books', component: BookManageComponent },
  { path: 'admin/users', component: UserManageComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
