<?php

namespace App\Exports;

use App\Book;
use App\Author;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Support\Collection;
use Log;

class BooksWithAuthorsExport implements FromCollection {
  /**
  * @return \Illuminate\Support\Collection
  */
  public function collection() {
    $q = Book::with('author')->get();
    $collection = collect([]);
    Log::info($q);
    foreach($q as $value) {
      $v = ['title' => $value->title, 'author' => $value->author->fullName];
      Log::info($v);
      $collection->push($v);
    }
    Log::info($collection);
    return Book::with('author')->select('title')->get();
    // return Book::with(array('author'=>function($query){
    //   $query->select('fullName');
    // }))->select('title')->get();
  }
}
