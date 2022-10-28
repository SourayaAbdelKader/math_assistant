<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

//Models
use App\User;
use App\Tag;
use App\Answer;
use App\Saved_question;

class Question extends Model{

    use HasFactory;

    public function users(){
        return $this->belongsTo(User::class);
    }

    public function answers(){
        return $this->hasMany(Answer::class);
    }

    public function tags(){
        return $this->belongsTo(Tag::class);
    }

    public function saved_questions() {
        return $this->hasMany(Saved_question::class);
    }
}
