<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Book Routes
Route::get('books', 'BookController@index');
Route::post('books', 'BookController@store');
Route::get('books/{id}', 'BookController@show');
Route::put('books/{id}', 'BookController@update');
Route::put('books', 'BookController@deleteMany');
// Route::delete('books/{id}', 'BookController@delete');

// Author Routes
Route::get('authors', 'AuthorController@index');
Route::get('authors/{id}', 'AuthorController@show');
// Route::post('authors', 'AuthorController@store');
// Route::put('authors/{id}', 'AuthorController@update');
// Route::delete('authors/{id}', 'AuthorController@delete');

// Export Routes
Route::get('export/books', 'BookController@export');
Route::get('export/booksWithAuthors', 'BookController@exportWithAuthors');
Route::get('export/authors', 'AuthorController@export');
Route::get('export/authorsWithBooks/{id}', 'AuthorController@exportWithBooks');


