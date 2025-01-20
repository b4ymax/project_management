<?php

use App\Http\Controllers\EmployeeController;
Route::get('/employee', [EmployeeController::class, 'index'])->name('employee.index');
Route::get('/employee/create', [EmployeeController::class, 'create'])->name('employee.create');
Route::post('/employee', [EmployeeController::class, 'store'])->name('employee.store');
Route::delete('/employee/{employee}', [EmployeeController::class, 'delete'])->name('employee.delete');
Route::get('/employee/{employee}/edit', [EmployeeController::class, 'edit'])->name('employee.edit');
Route::put('/employee/{employee}', [EmployeeController::class, 'update'])->name('employee.update');

Route::get('/employee/employeeprojects', [EmployeeController::class, 'showEmployeeProjects'])->name('employee.projects');

Route::delete('/employee/{employee}', [EmployeeController::class, 'softDelete'])->name('employee.softDelete');
Route::get('/employee/employeerecord', [EmployeeController::class, 'deletedEmployees'])->name('employee.record');

Route::get('/employee/{employee}', [EmployeeController::class, 'show'])->name('employee.show');

Route::post('/employee/{employee}/assign', [EmployeeController::class, 'assignProject'])->name('employee.assignProject');