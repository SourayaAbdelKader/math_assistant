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
use App\Solution;

class Problem extends Model{

    use HasFactory;

    public function tags(){
        return $this->belongsTo(Tag::class);
    }

    public function solutions(){
        return $this->hasMany(Solution::class);
    }

    public function users(){
        return $this->belongsTo(User::class);
    }

}
