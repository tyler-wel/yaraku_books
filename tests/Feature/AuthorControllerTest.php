<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;
use App\Author;

class AuthorControllerTest extends TestCase
{
  use RefreshDatabase;

  public function setUp(): void {
    parent::setUp();
    $this->authorCount = 25;
    factory(Author::class, $this->authorCount)->create();
  }

  /**
   * Assert index returns 200 and data
   */
  public function test_index_200() {
    $response = $this->get('/api/authors');
    $response
      ->assertStatus(200)
      ->assertJsonCount($this->authorCount)
      ->assertJsonStructure([ '*' => [
        "id",
        "firstName",
        "lastName",
        "abr",
        "fullName"
      ]]);
  }

  /**
   * Assert show returns 200 and data with provided id
   */
  public function test_show_200() {
    $response = $this->get('/api/authors/1');
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
   * Assert export returns 200
   */
  public function test_export_authors_csv() {
    $response = $this->get('/api/export/authors');
    $response->assertOk();
  }
}
