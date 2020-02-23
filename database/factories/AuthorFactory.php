<?php

use App\Author;
use Faker\Generator as Faker;
use Faker\Provider\en_US\Person;
use Illuminate\Support\Str;

$factory->define(Author::class, function (Faker $faker) {
  $firstName = $faker->firstName;
  $lastName = $faker->lastName;
  return [
    'firstName' => $firstName,
    'lastName' => $lastName,
    'fullName' => $firstName . " " . $lastName,
    'abr' => substr($firstName, 0, 1) . ". " . $lastName,
  ];
});



