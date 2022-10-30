<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){

        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->text('description', 1500)->nullable();
            $table->integer('score')->default(30)->nullable();
            $table->tinyInteger('accepted')->nullable();
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('question_id')->references('id')->on('questions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('answers');
    }
};
