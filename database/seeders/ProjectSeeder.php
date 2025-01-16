<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    public function run()
    {
        Project::create([
            'name' => 'Project Alpha',
            'description' => 'Description of Project Alpha',
        ]);

        Project::create([
            'name' => 'Project Beta',
            'description' => 'Description of Project Beta',
        ]);
    }
}