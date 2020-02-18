<?php

namespace App\Http\Controllers;

use App\Author;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthorController extends Controller
{
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
   * Create new author
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
      'lastName' => $validatedData['abr'],
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
   * Update an existing author
   * 
   * @param Request $request
   * @param int $id
   * @return Author
   */
  public function update(Request $request, $id) {
    $author = Author::findOrFail($id);
    $author->update($request->all());

    return response()->json($author, 200);
  }

  /**
   * Deletes existing author
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
