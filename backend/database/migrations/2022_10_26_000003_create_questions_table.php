<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){
        
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->text('problem', 1500)->nullable();
            $table->text('description', 1500)->nullable();
            $table->text('suggested_solution', 1500)->nullable();
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('tag_id')->references('id')->on('tags')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('questions');
    }
};
