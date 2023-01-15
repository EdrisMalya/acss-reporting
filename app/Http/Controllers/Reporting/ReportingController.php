<?php

namespace App\Http\Controllers\Reporting;

use App\Helpers\DatatableBuilder;
use App\Http\Controllers\Controller;
use App\Models\AcssTransactions;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportingController extends Controller
{
    public function index($lang, Request $request, $type){
        switch ($type){
            case 'acss-transactions':
                $this->allowed('acss-transactions-access');

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
                    $data = $data->whereBetween('sdate', [
                        date('Y-m-d H:i', strtotime($request->get('start_date'))),
                        date('Y-m-d H:i', strtotime($request->get('end_date')))
                    ]);
                }
                $datatables = new DatatableBuilder($data, $request, $search);
                $datatables->primary_key = 'idnum';
                return Inertia::render('Reports/AcssTransactions/AcssTransactionsIndex', [
                    'active' => 'acss-transactions',
                    'data' => $datatables->build(),
                    'start_date' => $request->get('start_date'),
                    'end_date' => $request->get('end_date')
                ]);
        }
    }
}
