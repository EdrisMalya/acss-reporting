<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('roles')->delete();
        
        \DB::table('roles')->insert(array (
            0 => 
            array (
                'id' => 1,
                'created_by' => 1,
                'updated_by' => 1,
                'role_group_id' => 1,
                'name' => 'Super admin',
                'created_at' => '2022-12-11 06:07:09',
                'updated_at' => '2022-12-17 08:26:59',
            ),
            1 => 
            array (
                'id' => 2,
                'created_by' => 3,
                'updated_by' => 3,
                'role_group_id' => 1,
                'name' => 'Acss reporter',
                'created_at' => '2023-01-15 12:39:31',
                'updated_at' => '2023-01-15 12:39:37',
            ),
        ));
        
        
    }
}