import { BookService } from './../_service/book.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../_models/book';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private bookService: BookService) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  book:Book;
  bookForm:FormGroup;
  imagePreview:any;
  errors:any;
  message:any;
  inputImage:any;

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title:[this.book?.title, Validators.compose([
        Validators.required
      ])],
      author:[this.book?.author, Validators.compose([
        Validators.required
      ])],
      isbn:[this.book?.isbn, Validators.compose([
        Validators.required
      ])],
      publisher:[this.book?.publisher, Validators.compose([
        Validators.required
      ])],
      review:[this.book?.review, Validators.compose([
        Validators.required
      ])],
      images:[this.book?.images, Validators.compose([
        Validators.required
      ])],
    })
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

  addBook():void{
    let formData = new FormData();
    formData.append('images', this.inputImage);
    formData.append("title",this.title.value);
    formData.append("author",this.author.value);
    formData.append("isbn",this.isbn.value);
    formData.append("publisher",this.publisher.value);
    formData.append("review",this.review.value);
    this.bookService.create(formData).subscribe(
      res => {
        this.errors = null;
        this.message = "Book created";
        console.log('book created: {}', res);
      },
      err => {
        this.message = null;
        this.errors = JSON.stringify(err);
        console.log("Add book error: ", this.errors);

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
