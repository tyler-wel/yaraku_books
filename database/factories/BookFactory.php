<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
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

class BookFaker extends \Faker\Provider\Base {
  public function title($nbWords = 3) {
    $sentence = $this->generator->sentence($nbWords);
    return substr($sentence, 0, strlen($sentence) - 1);
  }
}

$factory->define(Book::class, function (Faker $faker) {
  $faker->addProvider(new BookFaker($faker));
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
    'title' => $faker->title,
    'author_id' => factory(App\Author::class),
    'description' => $faker->text,
    'genre' => $genres[$randNumber],
    'published' => $faker->date
  ];
});



