import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from 'src/app/services/models';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

  private _book: BookResponse = {};
  private _manage: boolean = false;
  private _bookCover: string | undefined;
  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();


  public get bookCover(): string | undefined {
    if (this._book.cover) {
      return 'data:image/jpg;base64, ' + this._book.cover;  // Usa `this._book.cover` en lugar de `this.bookCover`
    }
    return 'https://picsum.photos/1900/800';
  }

  public get book(): BookResponse {
    return this._book;
  }

  @Input()
  public set book(value: BookResponse) {
    this._book = value;
  }

  public get manage(): boolean {
    return this._manage;
  }

  @Input()
  public set manage(value: boolean) {
    this._manage = value;
  }

  onArchive() {
    this.archive.emit(this._book)
  }

  onShare() {
    this.share.emit(this._book)
  }

  onEdit() {
    this.edit.emit(this._book)
  }

  onAddtoWaitingList() {
    this.details.emit(this._book)
  }

  onBorrow() {
    this.borrow.emit(this._book)
  }
  
  onShowDetails() {
   this.addToWaitingList.emit(this._book)
  }

}
