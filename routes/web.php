<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home'); 
});

Route::view('/about', 'about'); // directly return view if it is a static page

Route::view('/services', 'services', ['services' => [
    'Service 1', 'Service 2', 'Service 3', 'Service 4'
]]); // directly return view if it is a static page

Route::get('/hello', 'HelloController@index'); // GET request. Return dynamic view from HelloController
