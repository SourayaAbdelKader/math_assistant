<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

    public function up(){

        Schema::create('solutions', function (Blueprint $table) {
            $table->id();
            $table->text('description', 1500);
            $table->tinyInteger('checked')->nullable();
            $table->text('feedback', 1500)->nullable();
            $table->integer('score')->nullable();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('problem_id')->constrained('problems');
            $table->foreignId('editor_id')->constrained('users');
            $table->timestamps();
        });
    }

    public function down(){
        Schema::dropIfExists('solutions');
    }
};
