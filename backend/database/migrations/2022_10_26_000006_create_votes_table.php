<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){

        Schema::create('votes', function (Blueprint $table) {
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('answer_id')->references('id')->on('answers')->onDelete('cascade');
            $table->tinyInteger('vote');
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('votes');
    }
};
