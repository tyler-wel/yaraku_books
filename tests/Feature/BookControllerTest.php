<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;
use App\Book;

class BookControllerTest extends TestCase
{
  use RefreshDatabase;

  public function setUp(): void {
    parent::setUp();
    $this->bookCount = 25;
    factory(Book::class, $this->bookCount)->create();
  }

  /**
   * Assert index returns 200 and data
   */
  public function test_index_200() {
    $response = $this->get('/api/books');
    $response
      ->assertStatus(200)
      ->assertJsonCount($this->bookCount);
  }

  /**
   * Assert show returns 200 and data with provided id
   */
  public function test_show_200() {
    $response = $this->get('/api/books/1');
    // $response->dump();
    $response
      ->assertStatus(200)
      ->assertJsonFragment(["id" => 1]);
  }

  /**
   * Assert show returns 404 when data not found
   */
  public function test_show_404() {
    $response = $this->get('/api/books/26');
    $response->assertStatus(404);
  }

  /**
   * Assert update returns 200 and updated data with correct id and params
   */
  public function test_update_200() {
    $response = $this->put('/api/books/1', [
      "title" => 'new title',
      'genre' => 'new genre',
      'description' => 'new description',
      'published' => '2020/02/01'
    ]);
    $response
      ->assertStatus(200)
      ->assertJsonFragment([
        'id' => 1,
        'title' => 'new title',
        'genre' => 'new genre',
        'description' => 'new description',
        'published' => '2020/02/01'
      ]);
  }

  /**
   * Assert update returns 404 when data not found
   */
  public function test_update_404() {
    $response = $this->put('/api/books/26', ['title' => 'new title']);
    $response->assertStatus(404);
  }

  /**
   * Assert update returns 500 when params is incorrect
   */
  public function test_update_500() {
    $response = $this->put('/api/books/1');
    $response->assertStatus(500);
  }

  /**
   * Assert delete returns 204 when deleted correctly
   */
  public function test_delete_204() {
    $response = $this->put('/api/books', [["id" => 1], ["id" => 2]]);
    $response->assertStatus(204);
  }

  /**
   * Assert delete returns 404 when data not found
   */
  public function test_delete_404() {
    $response = $this->put('/api/books', [["id" => 26]]);
    $response->assertStatus(404);
  }

  /**
   * Assert export returns 200
   */
  public function test_export_books_csv() {
    $response = $this->get('/api/export/books');
    $response->assertOk();
  }

  /**
   * Assert export returns 200
   */
  public function test_export_books_with_authors_csv() {
    $response = $this->get('/api/export/booksWithAuthors');
    $response->assertOk();
  }
}
