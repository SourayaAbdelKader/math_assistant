<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

//Models
use App\User;
use App\Problem;

class Solution extends Model{

    use HasFactory;

    public function problems(){
        return $this->belongsTo(Problem::class);
    }

    public function users(){
        return $this->belongsTo(User::class);
    }

    public function editors(){
        return $this->belongsTo(User::class);
    }

}
