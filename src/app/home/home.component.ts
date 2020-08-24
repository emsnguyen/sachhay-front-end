import {
  Component,
  OnInit
} from '@angular/core';
import {
  Book
} from '../_models/book';
import {
  Rating
} from '../_models/rating';
import {
  BookService
} from '../_service/book.service';
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  Event,
  NavigationEnd
} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: Book[];
  errorMessage: string;
  searchQuery: string;

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      console.log(event);
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.searchQuery = this.route.snapshot.queryParamMap.get('q');
    if (this.searchQuery) {
      this.bookService.search(this.searchQuery).subscribe(
        res => {
          if (res === null || res.length == 0) {
            this.errorMessage = "No books found";
            return
          }
          this.books = res.data;
          this.books.forEach(book => {
            book.averageRating = this.getAverageBookRating(book.ratings)
          });
        },
        err => {
          this.errorMessage = err.message;
        }
      );
    } else {
      this.bookService.getAll().subscribe(
        res => {
          if (res === null || res.length == 0) {
            this.errorMessage = "No books found";
            return;
          }
          this.books = res.data;
          this.books.forEach(book => {
            book.averageRating = this.getAverageBookRating(book.ratings)
          });
        },
        err => {
          this.errorMessage = err.message;
        }
      );
    }
  }

  getAverageBookRating(ratings: Rating[]): number {
    const intitalValue = 0;
    return ratings.reduce((a, b) => (a + b.value), intitalValue) / ratings.length;
  }
  createRange(start, end) {
    var items: number[] = [];
    for (var i = start; i < end; i++) {
      items.push(i);
    }
    return items;
  }
}
