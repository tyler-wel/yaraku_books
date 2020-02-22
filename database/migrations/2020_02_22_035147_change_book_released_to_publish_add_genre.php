<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeBookReleasedToPublishAddGenre extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('books', function (Blueprint $table) {
      $table->renameColumn('released', 'published');
    });

    /**
     * Having issues with changing multiple columns in this migration
     * for now just moving genre to the original migration file.
     * Not good management low on time
     * See https://stackoverflow.com/questions/42165587/laravel-table-has-no-column-named
     */

    // Schema::table('books', function (Blueprint $table) {
    //   $table->string('genre')->nullable();
    // });

  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('books', function (Blueprint $table) {
      $table->renameColumn('published', 'released');
    });

    // Same as comment in up()

    // Schema::table('books', function (Blueprint $table) {
    //   $table->dropColumn('genre');
    // });
  }
}
