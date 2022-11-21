<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

//Models
use App\Problem;
use App\Question;

class Tag extends Model{

    use HasFactory;

    protected $fillable = [
        'title',
        'description',
    ];

    public function questions(){
        return $this->hasMany(Question::class);
    }

    public function problems(){
        return $this->hasMany(Problem::class);
    }
}
