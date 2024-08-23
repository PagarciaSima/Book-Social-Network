import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookResponse } from 'src/app/services/models/book-response';
import { PageResponseBookResponse } from 'src/app/services/models/page-response-book-response';
import { BookService } from 'src/app/services/services/book.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit{

  bookResponse: PageResponseBookResponse = {};
  public page: number = 0;
  public size: number = 4;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  findAllBooks() {
    this.bookService.findALlBooksByOwner({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (books: PageResponseBookResponse) => {
        this.bookResponse = books;
        console.log("Response " + this.bookResponse.content)
      }
    })
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }
  
  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }
  
  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1;
  }

  editBook(book: BookResponse) {
    this.router.navigate(['books', 'manage', book.id])
  }
  
  shareBook(book: BookResponse) {
    console.log("SHARE");
    this.bookService.updateShareableStatus({
      'book-id': book.id as number
    }).subscribe({
      next: (): void => {
        book.shareable = !book.shareable;
      }
    });
  }

  
  archiveBook(book: BookResponse) {

  }
}
