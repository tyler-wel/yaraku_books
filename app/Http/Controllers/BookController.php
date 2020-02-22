<?php

namespace App\Http\Controllers;

use App\Author;
use App\Book;
use Illuminate\Http\Request;
use Log;

class BookController extends Controller
{
    /**
   * Lists all books
   *
   * @return Response
   */
  public function index() {
    $books = Book::with('author')->get();
    return response()->json($books, 200);
  }


  /**
   * Create new book
   *
   * @param Request $request
   * @return Response
   */
  public function store(Request $request) {
    $validatedData = $request->validate([
      'title' => 'required',
      'description' => 'required'
    ]);

    $book = Book::create([
      'title' => $validatedData['title'],
      'description' => $validatedData['description'],
      'genre' => $request->get('genre'),
      'published' => $request->get('published')
    ]);

    // Associate the book to the passed in Author
    // Should be required, TODO: figure out association validation for request
    $book->author()->associate($request->author());

    $book->save();

    return response()->json($book, 201);
  }

  /**
   * Show specific book
   *
   * @param int $id
   * @return Response
   */
  public function show($id) {
    Log::info($id);
    $book = Book::with('author')->findOrFail($id);
    return response()->json($book, 200);
  }

  /**
   * Update an existing book
   *
   * @param Request $request
   * @param int $id
   * @return Response
   */
  public function update(Request $request, $id) {
    $book = Book::findOrFail($id);
    // TODO: confirm if this is safe or not
    $book->update($request->all());

    return response()->json($book, 200);
  }

  /**
   * Deletes existing book
   *
   * @param int $id
   * @return int
   */
  public function delete($id) {
    $book = Book::findOrFail($id);
    $book->delete();

    return response()->json(null, 204);
  }
}
