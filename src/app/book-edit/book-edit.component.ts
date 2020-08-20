import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BookService } from '../_service/book.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Book } from '../_models/book';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})

export class BookEditComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  book:Book;
  bookForm:FormGroup;
  imagePreview:any;
  errors:any;
  message:any;
  inputImage:any;
  bookId:number;

  constructor(
    private route: ActivatedRoute,
    private bookService:BookService,
    private fb:FormBuilder
    ) {
      this.bookId = this.route.snapshot.params.id;
      console.log("id: " + this.bookId);
    }

  ngOnInit(): void {
    this.bookService.getOne(this.bookId).subscribe(
      res => {
        this.book = res.data;
        this.bookForm = this.fb.group({
          title:[this.book.title, Validators.compose([
            Validators.required
          ])],
          author:[this.book.author, Validators.compose([
            Validators.required
          ])],
          isbn:[this.book.isbn, Validators.compose([
            Validators.required
          ])],
          publisher:[this.book.publisher, Validators.compose([
            Validators.required
          ])],
          review:[this.book.review, Validators.compose([
            Validators.required
          ])],
          images:[''],
        });
        if (this.book.images[0]) {
          this.imagePreview = this.book.images[0].url;
        }
      },
      err => {
        console.log("err: ", err);
      }

    );
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      this.inputImage = event.target.files[0];

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imagePreview = event.target.result;
      }
    }
  }

  updateBook():void{
    let formData = new FormData();
    formData.append('id', '' + this.bookId);
    if (this.inputImage) {
      formData.append('images', this.inputImage);
    }
    formData.append("title",this.title.value);
    formData.append("author",this.author.value);
    formData.append("isbn",this.isbn.value);
    formData.append("publisher",this.publisher.value);
    formData.append("review",this.review.value);
    // let formData = new Book();
    // formData.title = this.title.value;
    // formData.images = this.inputImage;
    this.bookService.update(this.bookId, formData).subscribe(
      res => {
        this.errors = null;
        this.message = "Book updated";
        console.log('book updated: {}', res);
      },
      err => {
        this.message = null;
        this.errors = JSON.stringify(err);
        console.log("Update book error: ", this.errors);

      }
    )
  }

  get title() {
    return this.bookForm.get('title');
  }
  get isbn() {
    return this.bookForm.get('isbn');
  }
  get publisher() {
    return this.bookForm.get('publisher');
  }
  get author() {
    return this.bookForm.get('author');
  }
  get review() {
    return this.bookForm.get('review');
  }
  get images() {
    return this.bookForm.get('images');
  }
}
