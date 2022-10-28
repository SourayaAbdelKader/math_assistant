<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

//Models
use App\User;
use App\Question;
use App\Vote;

class Answer extends Model{

    use HasFactory;

    public function users(){
        return $this->belongsTo(User::class);
    }

    public function questions(){
        return $this->belongsTo(Question::class);
    }

    public function votes() {
        return $this->hasMany(Vote::class);
    }
}
