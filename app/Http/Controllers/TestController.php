<?php

namespace App\Http\Controllers;

use App\Exports\AcssTransactionsExport;
use App\Exports\UsersExport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class TestController extends Controller
{
    public function test(Request $request){
        $export_name = "Transaction report from {$request->get('startDate')} to {$request->get('endDate')}.xlsx";
        return Excel::download(new AcssTransactionsExport(
            $request->get('startDate'), $request->get('endDate'),
            $request->get('filterDate'),
            $request->get('ignore_columns'),
            $request->get('columns')
        ),
        $export_name);
    }
    public static function resolve($path, $obj) {
        $path = explode('.', $path);
        return array_reduce($path, function($prev, $curr) use ($obj) {
            return $prev ? $prev[$curr] : null;
        }, $obj ? $obj : $GLOBALS);
    }
}
