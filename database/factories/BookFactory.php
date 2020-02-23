<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
use App\Author;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

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



