<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
  protected $fillable = ['firstName', 'lastName', 'abr'];

  // Author:Book 1:N
  public function books() {
      return $this->hasMany(Book::Class);
  }
}
