<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){

        Schema::create('solutions', function (Blueprint $table) {
            $table->id();
            $table->text('description', 1500);
            $table->tinyInteger('checked')->default('0');
            $table->text('feedback', 1500)->nullable();
            $table->integer('score')->nullable();
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('problem_id')->references('id')->on('problems')->onDelete('cascade');
            $table->foreignId('editor_id')->references('id')->on('users')->nullable()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('solutions');
    }
};
