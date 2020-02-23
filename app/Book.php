<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
  protected $fillable = ['title', 'author_id', 'description', 'published', 'genre'];

  // Book:Author 0:1
  public function author() {
    return $this->belongsTo(Author::class) ;
  }
}
