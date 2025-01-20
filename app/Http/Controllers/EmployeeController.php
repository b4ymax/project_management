<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;

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
        // best way of coding
        $employee = Employee::findOrFail($id);
        // $unassignedProjects = Project::whereHas('employees', function (Builder $query) use ($id) {
        //     $query->where('employees.id', '!=', $id);
        // })->get()
        //     ->map(fn($project) => $project->only('id','name'))
        //     ->toArray();

        // debug
        // dd($unassignedProjects);

        $unassignedProjects = Project::query()
            // ->whereNull('employee_id')
            ->whereNotIn('id', $employee->projects->pluck('id'))
            ->get()
            ->map(fn($project) => $project->only('id','name'))
            ->toArray();

        return Inertia::render('Employee/EmployeeDetail', [
            'employee' => $employee,
            'unassignedProjects' => $unassignedProjects, // Pass projects to the frontend
        ]);
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

    // public function assignProject(Request $request, $id)
    // {
    //     dd($request->all());

    //     $employee = Employee::findOrFail($id);
    //     $projectId = $request->input('project_id');

    //     // Check if the project is unassigned
    //     $project = Project::where('id', $projectId)->first();

    //     if (!$project) {
    //         return back()->withErrors(['error' => 'Project is not available or already assigned.']);
    //     }

    //     return back()->with('success', 'Project assigned successfully!');
    // }

    // public function assignProject()
    // {
    //     $employees = Employee::all();
    //     $projects = Project::all();

    //     return inertia('Employee/AssignProject', [
    //         'employees' => $employees,
    //         'projects' => $projects,
    //     ]);
    // }

    public function assignProject(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
        ]);

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

    public function softDelete(Employee $employee)
    {
        $employee->delete();
        //restore
        //$employee->restore();

        return response()->json(['message' => 'Employee not found.'], 404);
    }

    public function deletedEmployees()
    {
        $employees = Employee::onlyTrashed()->get(); // Use onlyTrashed() to fetch soft-deleted records
        return inertia('Employee/EmployeeRecord', ['employees' => $employees]);
    }

    
}
