<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 70);
            $table->string('email', 70)->unique();
            $table->string('password');
            $table->string('phone', 45)->nullable();
            $table->string('gender', 45)->nullable();
            $table->string('location', 70)->nullable();
            $table->date('birthdate', 70)->nullable();
            $table->string('picture_url', 50000)->nullable();
            $table->string('degree', 70)->nullable();
            $table->enum('user_type', ['admin', 'editor', 'user'])->default('user');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('users');
    }
};
