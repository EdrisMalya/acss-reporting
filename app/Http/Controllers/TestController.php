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
        $date1 = $request->get('startDate');
        $date2 = $request->get('endDate');

        $ts1 = strtotime($date1);
        $ts2 = strtotime($date2);

        $year1 = date('Y', $ts1);
        $year2 = date('Y', $ts2);

        $month1 = date('m', $ts1);
        $month2 = date('m', $ts2);

        $diff = (($year2 - $year1) * 12) + ($month2 - $month1);
        if($diff < 0){
            return translate('Start date must be lower then end date');
        }else{
            if($diff > 4){
                return translate('Reports can be generated between 4 months');
            }
        }
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
