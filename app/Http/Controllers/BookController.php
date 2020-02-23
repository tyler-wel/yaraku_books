<?php

namespace App\Http\Controllers;

use App\Author;
use App\Book;
use Illuminate\Http\Request;
use Log;
use Carbon\Carbon;
use App\Exports\BooksExport;
use App\Exports\BooksWithAuthorsExport;
use Maatwebsite\Excel\Facades\Excel;

class BookController extends Controller {

  /**
   *
   */
  public function export() {
    return Excel::download(new BooksExport, 'books.csv');
  }

  /**
   *
   */
  public function exportWithAuthors() {
    return Excel::download(new BooksWithAuthorsExport, 'booksWithAuthors.csv');
  }

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
    ]);

    $author = Author::find($request->get('author_id'));
    $published = $request->get('published');
    // This is probably not a very good way to handle publishing,
    //  if I had more time I would make this nullable
    if($published == null) {
      $published = Carbon::now();
    }
    // I forgot to add description textarea to create screen
    //  description will be left empty on creation
    $book = Book::create([
      'title' => $validatedData['title'],
      'author_id' => $this->getAuthor($author, $request)->id,
      'description' => 'None',
      'genre' => $request->get('genre'),
      'published' => $published
    ]);

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

    $author = Author::find($request->get('author_id'));

    $book->title = $request->get('title');
    $book->author_id = $this->getAuthor($author, $request)->id;
    $book->description = $request->get('description');
    $book->genre = $request->get('genre');
    $book->published = $request->get('published');
    $book->save();

    return response()->json($book, 200);
  }

  /**
   * Delete all books provided in request
   *
   * @param Request $request
   * @return Response
   */
  public function deleteMany(Request $request) {
    foreach ($request->all() as $value) {
      $book = Book::findOrFail($value['id']);
      $book->delete();
    }
    return response()->json(null, 204);
  }


  // Helper classes
  /**
   *
   */
  private function getAuthor($author, $request) {
    if($author == null) {
      // Because input is not validated, this is possibly a big no-no
      //  potential for many errors, but for now it works
      $fullName = $request->get('author_name');
      $names = explode(' ', $fullName);
      $firstName = $names[0];
      $lastName = count($names) > 1 ? $names[1] : "";
      $author = Author::create([
        'firstName' => $firstName,
        'lastName' => $lastName,
        'fullName' => $fullName,
        'abr' => substr($firstName, 0, 1) . ". " . $lastName,
      ]);
    }
    return $author;
  }

  /**
   * Deprecated but keeping code
   */
  // public function delete($id) {
  //   $book = Book::findOrFail($id);
  //   $book->delete();

  //   return response()->json(null, 204);
  // }
}
