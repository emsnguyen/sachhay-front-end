import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../../_models/book';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BookService } from '../../../_service/book.service';

@Component({
  selector: 'app-book-manage',
  templateUrl: './book-manage.component.html',
  styleUrls: ['./book-manage.component.scss']
})
export class BookManageComponent implements OnInit {

  displayedColumns: string[] = ['title', 'author', 'isbn', 'publisher', 'created_at', 'action'];
  data: Book[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  editBook: any;
  oldBook: any;
  editdisabled: boolean;

  dataSource: MatTableDataSource < any > ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {

    this.isLoadingResults = true;
    this.bookService.getAll().subscribe(res => {
        this.data = res.data;
        this.dataSource = new MatTableDataSource(this.data);
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = this.data.length;
      },
      err => {
        console.log(err);
      }
    );
  }
  editRow(user): void {
    console.log(user);
    this.editBook = user && user.id ? user : {};
    this.oldBook = {
      ...this.editBook
    };
  }
  deleteRow(user): void {
    this.bookService.delete(user.id).subscribe(
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
    this.editdisabled = true;
    let formData = new FormData();
    delete this.editBook.images;
    Object.keys(this.editBook).forEach(key => formData.append(key, this.editBook[key]));
    this.bookService.update(this.editBook.id, formData)
      .subscribe(
        res => {
          this.editBook = {};
          this.editdisabled = false;
          if (res.data) {
            this.oldBook = {};
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
    this.editBook = {};
    let index = this.data.findIndex(item => item.id === this.oldBook.id)
    this.data.splice(index, 1, this.oldBook);
  }

}
