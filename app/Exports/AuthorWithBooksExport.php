<?php

namespace App\Exports;

use App\Author;
use App\Book;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Log;

class AuthorWithBooksExport implements FromQuery {

    use Exportable;

    public function __construct(int $id) {
      $this->id = $id;
    }

    public function query() {
      $q = Author::query()::find($id)->with('books');
      Log::info($q);
      return Author::query()::find($id)->with('books');
    }
}
