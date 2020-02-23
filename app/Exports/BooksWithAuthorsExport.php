<?php

namespace App\Exports;

use App\Book;
use App\Author;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Collection;

class BooksWithAuthorsExport implements FromCollection {

  /**
  * Return a collection of books and their authors
  *
  * @return \Illuminate\Support\Collection
  */
  public function collection() {
    $books = Book::with('author')->get();
    $collection = collect([]);
    foreach($books as $book) {
      $v = ['title' => $book->title, 'author' => $book->author->fullName];
      $collection->push($v);
    }
    return $collection;
  }
}
