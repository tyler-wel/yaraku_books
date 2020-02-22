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

$factory->define(Author::class, function (Faker $faker) {
//   $faker->addProvider(new Faker\Provider\en_US\Person($faker));

  return [
    'firstName' => $faker->firstName,
    'lastName' => $faker->lastName,
    'abr' => "",
  ];
});



