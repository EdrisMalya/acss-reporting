<?php

namespace App\Http\Controllers;

use App\Exports\AcssTransactionsExport;
use App\Exports\UsersExport;
use App\Models\AcssTransactions;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class TestController extends Controller
{
    public function test(Request $request){
        $filter_date = $request->has('filter_date') ? $request->get('filter_date'): 'sdate';
        $export_name = "Transaction report from {$request->get('startDate')} to {$request->get('endDate')}.csv";
        $handle = fopen(public_path("storage/exports/{$export_name}"), 'w');
        $headings = collect($request->get('columns'))->map(function($head) use ($request) {
            if($request->get('ignore_columns')!=null){
                if(!in_array($head['key'], $request->get('ignore_columns'))){
                    return [
                        'name' => $head['name'],
                        'key' => $head['key']
                    ];
                }
            }else{
                return [
                    'name' => $head['name'],
                    'key' => $head['key']
                ];
            }
        })->filter(function($row){
            return $row!=null;
        })->toArray();
        fputcsv($handle, collect($headings)->map(fn($row)=>$row['name'])->toArray());
        AcssTransactions::query()->whereBetween($filter_date, [
            date('Y-m-d H:i:s', strtotime($request->get('startDate').' 12:00:00')),
            date('Y-m-d H:i:s', strtotime($request->get('endDate').' 23:59:00'))
        ])->lazyById(2000, 'idnum')
            ->each(function ($row) use ($handle, $headings) {
                $data = collect($headings)->map(function($data) use($row) {
                    return $row[$data['key']];
                })->toArray();
                fputcsv($handle, $data);
            });
        fclose($handle);
        return response()->download(public_path("storage/exports/{$export_name}"))->deleteFileAfterSend();

    }
    public static function resolve($path, $obj) {
        $path = explode('.', $path);
        return array_reduce($path, function($prev, $curr) use ($obj) {
            return $prev ? $prev[$curr] : null;
        }, $obj ? $obj : $GLOBALS);
    }
}
