<?php

namespace App\Exports;

use App\Models\AcssTransactions;
use Illuminate\View\View;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromView;

class AcssTransactionsExport implements FromView
{
    public $start_date;
    public $end_date;
    public $filter_date;
    public $ignore_columns;
    public $columns;

    public function __construct($start_date, $end_date, $filter_date, $ignore_columns, $columns)
    {

        $this->start_date = $start_date;
        $this->end_date = $end_date;
        $this->filter_date = $filter_date;
        $this->ignore_columns = $ignore_columns;
        $this->columns = $columns;
    }

    public function view(): View
    {
        $transactions = AcssTransactions::query()->whereBetween($this->filter_date, [
            date('Y-m-d H:i', strtotime($this->start_date)),
            date('Y-m-d H:i', strtotime($this->end_date))
        ])->get();
        return view('acss_transactions', [
            'transactions' => $transactions,
            'columns' => $this->columns,
            'ignore_columns' => $this->ignore_columns == null? []: $this->ignore_columns
        ]);
    }
}
