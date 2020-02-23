<?php

namespace App\Http\Controllers;

use App\Author;
use App\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Log;
use App\Exports\AuthorsExport;
use App\Exports\AuthorWithBooksExport;
use Maatwebsite\Excel\Facades\Excel;

class AuthorController extends Controller {

  /**
   *
   */
  public function export() {
    return Excel::download(new AuthorsExport, 'authors.csv');
  }

  /**
   *
   */
  public function exportWithBooks($id) {
    Log::warning($id);
    return Excel::download(new AuthorWithBooksExport($id), 'authorWithBook.csv');
  }

  /**
   * Lists all authors
   *
   * @return Response
   */
  public function index() {
    // instead of all, maybe get where release_date > today?
    // filter by released
    $authors = Author::all();

    return response()->json($authors, 200);
  }


  /**
   * Create new author - NOT USED
   *
   * @param Request $request
   * @return Response
   */
  public function store(Request $request) {
    $validatedData = $request->validate([
      'firstName' => 'required',
      'lastName' => 'required',
      'abr' => 'required'
    ]);

    $author = Author::create([
      'firstName' => $validatedData['firstName'],
      'lastName' => $validatedData['lastName'],
      'fullName' => $validatedData['firstName'] . " " . $validatedData['lastName'],
      'abr' => $validatedData['abr']
    ]);

    return response()->json($author, 201);
  }

  /**
   * Show specific author
   *
   * @param int $id
   * @return Response
   */
  public function show($id) {
    $author = Author::with('books')->findOrFail($id);
    return response()->json($author, 200);
  }

  /**
   * Update an existing author - NOT USED
   *
   * @param Request $request
   * @param int $id
   * @return Author
   */
  public function update(Request $request, $id) {
    $author = Author::findOrFail($id);
    $author->update($request->all());
    $author->fullName = $author.firstName . " " . $author.lastName;
    $author->save();
    return response()->json($author, 200);
  }

  /**
   * Deletes existing author - NOT USED
   *
   * @param int $id
   * @return int
   */
  public function delete($id) {
    $author = Author::findOrFail($id);
    $author->delete();

    return response()->json(null, 204);
  }
}
