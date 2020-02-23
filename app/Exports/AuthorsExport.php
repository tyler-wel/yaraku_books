<?php

namespace App\Exports;

use App\Author;
use Maatwebsite\Excel\Concerns\FromCollection;
use Log;

class AuthorsExport implements FromCollection {
  /**
  * @return \Illuminate\Support\Collection
  */
  public function collection() {
    return Author::select('fullName')->get();
  }
}
