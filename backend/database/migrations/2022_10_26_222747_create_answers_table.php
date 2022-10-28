<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){

        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->text('description', 1500);
            $table->integer('score')->default(30);
            $table->tinyInteger('accepted')->nullable();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('question_id')->constrained('questions');
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('answers');
    }
};
