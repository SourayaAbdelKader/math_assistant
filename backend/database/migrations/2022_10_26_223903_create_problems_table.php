<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){

        Schema::create('problems', function (Blueprint $table) {
            $table->id();
            $table->string('name', 70);
            $table->text('description', 1500);
            $table->string('picture_url', 50000)->nullable();
            $table->enum('level', ['easy', 'medium', 'hard']);
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('tag_id')->references('id')->on('tags')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('problems');
    }
};
