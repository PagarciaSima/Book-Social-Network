import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookRequest } from 'src/app/services/models';
import { BookService } from 'src/app/services/services';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.scss']
})
export class ManageBookComponent {
  
  errorMsg: Array<string> = [];
  selectedBookCover: any;
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
    private router: Router
  ) {}

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
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }
}
