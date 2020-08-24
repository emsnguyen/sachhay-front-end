import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSort
} from '@angular/material/sort';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  User
} from '../../../_models/user';
import {
  UserService
} from '../../../_service/user.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  displayedColumns: string[] = ['name', 'username', 'email', 'role', 'banned', 'created_at', 'action'];
  data: User[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  editUser: any;
  oldUser: any;
  editdisabled: boolean;

  dataSource: MatTableDataSource < any > ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.sort.sortChange.subscribe(()=>this.paginator.pageIndex = 0);

    this.isLoadingResults = true;
    this.userService.getAll().subscribe(res => {
        this.data = res.data;
        this.dataSource = new MatTableDataSource(this.data);
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = this.data.length;
      },
      err => {
        console.log(err)
      }
    );
  }
  editRow(user): void {
    console.log(user);
    this.editUser = user && user.id ? user : {};
    this.oldUser = {
      ...this.editUser
    };
  }
  deleteRow(user): void {
    this.userService.delete(user.id).subscribe(
      res => {
        console.log('delete success ', res);
        let index = this.data.findIndex(item => item.id === user.id);
        this.data.splice(index, 1);
        this.resultsLength = this.data.length;
        this.dataSource = new MatTableDataSource(this.data);
      },
      err => {
        console.log('delete failed ', err);
      }
    )
  }
  confirmEdit(): void {
    //updateEdit
    this.editdisabled = true;
    this.userService.update(this.editUser)
      .subscribe(
        res => {
          this.editUser = {};
          this.editdisabled = false;
          if (res.data) {
            this.oldUser = {};
            console.log(res.data, 'Success!');
          } else {
            this.cancelEdit();
            console.log(res.ata, 'Error!');
          }
        },
        err => {
          console.log("Please try after some time", err);
          this.editdisabled = false;
          this.cancelEdit();
        });
  }
  cancelEdit(): void {
    //cancel
    this.editUser = {};
    let index = this.data.findIndex(item => item.id === this.oldUser.id)
    this.data.splice(index, 1, this.oldUser);
  }

}
