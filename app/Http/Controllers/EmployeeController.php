<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use Inertia\Inertia;
use App\Models\Project;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::all();
        return inertia('Employee', [
        'employees' => $employees,
    ]);
    }

    public function create()
    {
        return Inertia::render('Employee/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
        ]);
    
        Employee::create($validated);
    
        return redirect()->route('employee.index')->with('success', 'Employee created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        {
            $employee = Employee::findOrFail($id);
    
            return Inertia::render('Employee/EmployeeDetail', [
                'employee' => $employee,
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('Employee/Edit', [
            'employee' => $employee
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
        ]);
        $employee->update($validated);
        return redirect()->route('employee.index')->with('success', 'Employee updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Employee $employee)
    {
        $employee->delete();
        return redirect()->route('employee.index')->with('success', 'Employee deleted successfully.');
    }

    public function assignProject()
    {
        $employees = Employee::all();
        $projects = Project::all();

        return inertia('Employee/AssignProject', [
            'employees' => $employees,
            'projects' => $projects,
        ]);
    }

    public function assign(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'project_id' => 'required|exists:projects,id',
        ]);

        $employee = Employee::find($validated['employee_id']);
        $project = Project::find($validated['project_id']);

        // Assuming there is a many-to-many relationship between employees and projects
        $employee->projects()->attach($project);

        return redirect()->route('employee.index')->with('success', 'Project assigned successfully!');
    }

    public function showEmployeeProjects()
    {
        $employees = Employee::with('projects')->get(); // Get employees with projects
        return inertia('Employee/EmployeeProjects', [
            'employees' => $employees,
        ]);
    }

    public function softDelete($id)
    {
        $employee = Employee::find($id);
        if ($employee) {
            $employee->deleted_at = now();
            $employee->save();
            return response()->json(['message' => 'Employee soft-deleted successfully.'], 200);
        }

        return response()->json(['message' => 'Employee not found.'], 404);
    }

    public function deletedEmployees()
    {
        $employees = Employee::onlyTrashed()->get(); // Use onlyTrashed() to fetch soft-deleted records
        return inertia('Employee/EmployeeRecord', ['employees' => $employees]);
    }

    
}
