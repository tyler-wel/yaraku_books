<?php

namespace App\Exports;

use App\Book;
use Maatwebsite\Excel\Concerns\FromCollection;

class BooksExport implements FromCollection {
  /**
  * Return a collection of books
  *
  * @return \Illuminate\Support\Collection
  */
  public function collection() {
    return Book::select('title')->get();
  }
}
