<?php

namespace App\Http\Controllers\Reporting;

use App\Exports\UsersExport;
use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Models\AcssTransactions;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportingController extends Controller
{
    public function index($lang, Request $request, $type){
        switch ($type){
            case 'acss-transactions':
                $this->allowed('acss-transactions-access');
                if($request->has('start_date') && $request->has('end_date') && $request->has('filter_date')){
                    $data = AcssTransactions::query();
                    $search = [
                        'sdate',
                        'transid',
                        'COMMENT',
                        'tdate',
                        'prep_by',
                        'appr_by',
                        'sender_name',
                        'sender_acct',
                        'recv_acct',
                        'recvbr_acct',
                        'bene_name',
                        'currency',
                        'amount',
                        'STATUS',
                        'lastUpdate',
                    ];
                    if($request->has('start_date') && $request->has('end_date')){
                        $filter_date = $request->has('filter_date') ? $request->get('filter_date'): 'sdate';
                        $data = $data->whereBetween($filter_date, [
                            date('Y-m-d H:i:s', strtotime($request->get('start_date').' 12:00:00')),
                            date('Y-m-d H:i:s', strtotime($request->get('end_date').' 23:59:00'))
                        ]);
                    }
                    $datatables = new DatatableBuilder($data->orderBy('sdate', 'desc'), $request, $search);
                    $datatables->primary_key = 'idnum';
                    $datatable = $datatables->build();
                }else{
                    $datatable = AcssTransactions::query()->where('idnum', 0)->paginate();
                }
                return Inertia::render('Reports/AcssTransactions/AcssTransactionsIndex', [
                    'active' => 'acss-transactions',
                    'data' => $datatable,
                    'start_date' => $request->get('start_date'),
                    'end_date' => $request->get('end_date'),
                    'filter_date' => $request->has('filter_date')?$request->get('filter_date'):'sdate',
                    'show_download_excel' => ($request->has('start_date') && $request->has('end_date') && $request->has('filter_date'))
                ]);
        }
    }

    public function downloadExcel($lang, Request $request)
    {
        $this->allowed('acss-transactions-access');
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
