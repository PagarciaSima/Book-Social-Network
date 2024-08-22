import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookRequest, BookResponse } from 'src/app/services/models';
import { BookService } from 'src/app/services/services';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent implements OnInit{
  
  errorMsg: Array<string> = [];
  selectedBookCover: any;
  originalCover: any;
  selectedPicture: string | undefined;
  selectedFileName: string = '';
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };

  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if (bookId) {
      this.bookService.findById({
        'book-id': bookId
      }).subscribe({
        next: (book) => {
         this.bookRequest = {
           id: book.id,
           title: book.title as string,
           authorName: book.authorName as string,
           isbn: book.isbn as string,
           synopsis: book.synopsis as string,
           shareable: book.shareable
         };
         this.originalCover = book.cover;
         this.selectedPicture='data:image/jpg;base64,' + book.cover;
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedBookCover = input.files[0];
      this.selectedFileName = this.selectedBookCover.name;

      const reader: FileReader = new FileReader();
      reader.onload = (): void => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId) => {
        if (this.selectedBookCover) {

          this.bookService.uploadBookCoverPicture({
            body: {
              file: this.selectedBookCover
            },
            'book-id': bookId
          }).subscribe({
            next: () => {
              this.router.navigate(['/books/my-books']);
            }
          });
        } else {
            this.router.navigate(['/books/my-books']);
        }
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }
}
