<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\EmployeeController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    require __DIR__.'/web/project.php';
    require __DIR__.'/web/employee.php';
});

// Route::middleware(['can:manager'])->group(function () {
//     Route::get('/employee', [ProjectController::class, 'index'])->name('employee.index');
//     Route::get('/employee/create', [EmployeeController::class, 'create'])->name('employee.createemployee');
//     Route::post('/employee/store', [EmployeeController::class, 'store'])->name('employee.store');
// });


// Route::get('/projects', [ProjectController::class, 'index'])->name('project.index');
// Route::get('/project/create', [ProjectController::class, 'create'])->name('project.create');
// Route::post('/project', [ProjectController::class, 'store'])->name('project.store');
// Route::get('/project/{project}', [ProjectController::class, 'show'])->name('project.show');
// Route::get('/project/{project}/edit', [ProjectController::class, 'edit'])->name('project.edit');
// Route::put('/project/{project}', [ProjectController::class, 'update'])->name('project.update');
// Route::delete('/project/{project}', [ProjectController::class, 'destroy'])->name('project.destroy');


// Route::get('/employee', [EmployeeController::class, 'index'])->name('employee.index');
// Route::get('/employee/create', [EmployeeController::class, 'create'])->name('employee.create');
// Route::post('/employee', [EmployeeController::class, 'store'])->name('employee.store');




// Route::get('/email/verify', function () {
//     return auth('VerifyEmail');
// })->middleware('auth')->name('verification.notice');

// Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
//     $request->fulfill();
 
//     return redirect('/home');
// })->middleware(['auth', 'signed'])->name('verification.verify');

// Route::post('/email/verification-notification', function (Request $request) {
//     $request->user()->sendEmailVerificationNotification();
 
//     return back()->with('message', 'Verification link sent!');
// })->middleware(['auth', 'throttle:6,1'])->name('verification.send');

require __DIR__.'/auth.php';
