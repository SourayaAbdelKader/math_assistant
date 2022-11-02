<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

//Models
use App\Question;
use App\Problem;
use App\Solution;
use App\Answer;
use App\Vote;
use App\Score;
use App\Saved_question;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'user_type',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){
        return [];
    }

    public function questions(){
        return $this->hasMany(Question::class);
    }

    public function problems(){
        return $this->hasMany(Problem::class);
    }

    public function solutions(){
        return $this->hasMany(Solution::class);
    }

    public function answers(){
        return $this->hasMany(Answer::class);
    }

    public function votes(){
        return $this->hasMany(Vote::class);
    }

    public function scores(){
        return $this->hasMany(Score::class);
    }

    public function saved_questions(){
        return $this->hasMany(Saved_question::class);
    }

}