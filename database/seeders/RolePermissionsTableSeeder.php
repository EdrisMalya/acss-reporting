<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RolePermissionsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('role_permissions')->delete();
        
        \DB::table('role_permissions')->insert(array (
            0 => 
            array (
                'id' => 1065,
                'role_id' => 1,
                'permission_id' => 4,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            1 => 
            array (
                'id' => 1066,
                'role_id' => 1,
                'permission_id' => 5,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            2 => 
            array (
                'id' => 1067,
                'role_id' => 1,
                'permission_id' => 3,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            3 => 
            array (
                'id' => 1068,
                'role_id' => 1,
                'permission_id' => 2,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            4 => 
            array (
                'id' => 1069,
                'role_id' => 1,
                'permission_id' => 6,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            5 => 
            array (
                'id' => 1070,
                'role_id' => 1,
                'permission_id' => 9,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            6 => 
            array (
                'id' => 1071,
                'role_id' => 1,
                'permission_id' => 11,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            7 => 
            array (
                'id' => 1072,
                'role_id' => 1,
                'permission_id' => 10,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            8 => 
            array (
                'id' => 1073,
                'role_id' => 1,
                'permission_id' => 12,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            9 => 
            array (
                'id' => 1074,
                'role_id' => 1,
                'permission_id' => 15,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            10 => 
            array (
                'id' => 1075,
                'role_id' => 1,
                'permission_id' => 16,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            11 => 
            array (
                'id' => 1076,
                'role_id' => 1,
                'permission_id' => 17,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            12 => 
            array (
                'id' => 1077,
                'role_id' => 1,
                'permission_id' => 18,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            13 => 
            array (
                'id' => 1078,
                'role_id' => 1,
                'permission_id' => 19,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            14 => 
            array (
                'id' => 1079,
                'role_id' => 1,
                'permission_id' => 21,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            15 => 
            array (
                'id' => 1080,
                'role_id' => 1,
                'permission_id' => 22,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            16 => 
            array (
                'id' => 1081,
                'role_id' => 1,
                'permission_id' => 23,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            17 => 
            array (
                'id' => 1082,
                'role_id' => 1,
                'permission_id' => 14,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            18 => 
            array (
                'id' => 1083,
                'role_id' => 1,
                'permission_id' => 26,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            19 => 
            array (
                'id' => 1084,
                'role_id' => 1,
                'permission_id' => 27,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            20 => 
            array (
                'id' => 1085,
                'role_id' => 1,
                'permission_id' => 28,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            21 => 
            array (
                'id' => 1086,
                'role_id' => 1,
                'permission_id' => 29,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            22 => 
            array (
                'id' => 1087,
                'role_id' => 1,
                'permission_id' => 30,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            23 => 
            array (
                'id' => 1088,
                'role_id' => 1,
                'permission_id' => 32,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            24 => 
            array (
                'id' => 1089,
                'role_id' => 1,
                'permission_id' => 1,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            25 => 
            array (
                'id' => 1090,
                'role_id' => 1,
                'permission_id' => 13,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            26 => 
            array (
                'id' => 1091,
                'role_id' => 1,
                'permission_id' => 33,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            27 => 
            array (
                'id' => 1092,
                'role_id' => 1,
                'permission_id' => 34,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            28 => 
            array (
                'id' => 1093,
                'role_id' => 1,
                'permission_id' => 35,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            29 => 
            array (
                'id' => 1094,
                'role_id' => 1,
                'permission_id' => 37,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            30 => 
            array (
                'id' => 1095,
                'role_id' => 1,
                'permission_id' => 36,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            31 => 
            array (
                'id' => 1096,
                'role_id' => 1,
                'permission_id' => 38,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            32 => 
            array (
                'id' => 1097,
                'role_id' => 1,
                'permission_id' => 39,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            33 => 
            array (
                'id' => 1098,
                'role_id' => 1,
                'permission_id' => 40,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            34 => 
            array (
                'id' => 1099,
                'role_id' => 1,
                'permission_id' => 41,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            35 => 
            array (
                'id' => 1100,
                'role_id' => 1,
                'permission_id' => 42,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            36 => 
            array (
                'id' => 1101,
                'role_id' => 1,
                'permission_id' => 43,
                'created_at' => '2023-01-15 12:36:42',
                'updated_at' => '2023-01-15 12:36:42',
            ),
            37 => 
            array (
                'id' => 1102,
                'role_id' => 2,
                'permission_id' => 42,
                'created_at' => '2023-01-15 12:39:37',
                'updated_at' => '2023-01-15 12:39:37',
            ),
            38 => 
            array (
                'id' => 1103,
                'role_id' => 2,
                'permission_id' => 43,
                'created_at' => '2023-01-15 12:39:37',
                'updated_at' => '2023-01-15 12:39:37',
            ),
        ));
        
        
    }
}