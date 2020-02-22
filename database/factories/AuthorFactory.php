<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Author;
use Faker\Generator as Faker;
use Faker\Provider\en_US\Person;
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

class AbrFaker extends \Faker\Provider\Base {
    public function abr($fn, $ln) {
      $sentence = $this->generator->sentence($nbWords);
      return substr($sentence, 0, strlen($sentence) - 1);
    }
  }

$factory->define(Author::class, function (Faker $faker) {
//   $faker->addProvider(new Faker\Provider\en_US\Person($faker));
  $firstName = $faker->firstName;
  $lastName = $faker->lastName;
  return [
    'firstName' => $firstName,
    'lastName' => $lastName,
    'abr' => substr($firstName, 0, 1) . ". " . $lastName,
  ];
});



