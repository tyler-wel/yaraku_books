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


Route::get('books', 'BookController@index');
Route::post('books', 'BookController@store');
Route::get('books/{id}', 'BookController@show');
Route::put('books/{id}', 'BookController@update');
// Route::delete('books/{id}', 'BookController@delete');
Route::delete('books', 'BookController@deleteMany');

Route::get('authors', 'AuthorController@index');
// Route::post('authors', 'AuthorController@store');
Route::get('authors/{id}', 'AuthorController@show');
// Route::put('authors/{id}', 'AuthorController@update');
// Route::delete('authors/{id}', 'AuthorController@delete');
