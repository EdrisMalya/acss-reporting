<table>
    <thead>
        <tr>
            @foreach($columns as $column)
                @if(!in_array($column['key'], $ignore_columns))
                    <th>{{$column['name']}}</th>
                @endif
            @endforeach
        </tr>
    </thead>
    <tbody>
        @foreach($transactions as $transaction)
            <tr>
                @foreach($columns as $column)
                    @if(!in_array($column['key'], $ignore_columns))
                        <td>{{\App\Http\Controllers\TestController::resolve($column['key'], $transaction)}}</td>
                    @endif
                @endforeach
            </tr>
        @endforeach
    </tbody>
</table>
