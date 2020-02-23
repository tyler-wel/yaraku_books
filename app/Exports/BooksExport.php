<?php

namespace App\Exports;

use App\Book;
use Maatwebsite\Excel\Concerns\FromCollection;
use Log;

class BooksExport implements FromCollection {
  /**
  * @return \Illuminate\Support\Collection
  */
  public function collection() {
    return Book::select('title')->get();
  }
}
