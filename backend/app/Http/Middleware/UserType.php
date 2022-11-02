<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserType{

    public function handle(Request $request, Closure $next, ...$user_types){

        if (!Auth::check())
            return redirect('login');

        $user = Auth::user();

        if ($user->user_type == 'admin')
            return $next($request);

        foreach ($user_types as $user_type) {
            if ($user->user_type == $user_type)
                return $next($request);
        }

        return redirect('login');
    }
}
