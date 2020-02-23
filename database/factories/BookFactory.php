<?php

use App\Book;
use App\Author;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Book::class, function (Faker $faker) {
  $genres = array(
    'Fiction',
    'Non-Fiction',
    'Kids',
    'Young Adult',
    'Adult',
    'Mystery',
    'Murder',
    'Biography'
  );
  $randNumber = rand(0,7);

  return [
    'title' => $faker->sentence(2),
    'author_id' => factory(Author::class)->create()->id,
    'description' => $faker->text,
    'genre' => $genres[$randNumber],
    'published' => $faker->date
  ];
});



