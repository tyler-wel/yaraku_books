<?php

namespace App\Exports;

use App\Author;
use Maatwebsite\Excel\Concerns\FromCollection;

class AuthorsExport implements FromCollection {
  /**
  * Return a collection of authors
  *
  * @return \Illuminate\Support\Collection
  */
  public function collection() {
    return Author::select('fullName')->get();
  }
}
