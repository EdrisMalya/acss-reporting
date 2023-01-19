import React from 'react'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import useLanguage from '@/hooks/useLanguage'
import ReportsLinks from '@/Pages/Reports/ReportsLinks'
import Datatable from '@/Components/Datatable/Datatable'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDateTimePicker } from '@mui/x-date-pickers'
import { Button, TextField } from '@mui/material'
import { Inertia } from '@inertiajs/inertia'
import dayjs from 'dayjs'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRecoilState } from 'recoil'
import { fullPageLoading } from '@/atoms/fullPageLoading'
import MuiSelect from '@/Components/MUISelect'
import { useForm } from '@inertiajs/inertia-react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import TransactionFilterModel from '@/Pages/Reports/AcssTransactions/TransactionFilterModel'

const AcssTransactionsIndex = ({
    lang,
    active,
    data,
    start_date,
    end_date,
    filter_date,
    show_download_excel,
}) => {
    const { translate } = useLanguage()
    const [startDate, setStartDate] = React.useState(start_date)
    const [endDate, setEndDate] = React.useState(end_date)
    const [disableDates, setDisableDates] = React.useState(null)
    const [filterDate, setFilterDate] = React.useState(filter_date)
    const [ignore_columns, setIgnoreColumns] = React.useState([])
    const [columns, setColumns] = React.useState([])

    const [filter, setFilter] = React.useState(false)

    const [downloadExcel, setDownloadExcel] =
        React.useState(show_download_excel)

    const loading = useRecoilState(fullPageLoading)

    const handleDownloadExcel = event => {
        event.preventDefault()
        loading[1](false)
        post(route('get.report', { type: 'download-excel', lang }), {
            onSuccess: () => {
                loading[1](false)
            },
        })
    }

    return (
        <Authenticated
            active={'reports'}
            title={`Transactions from ${startDate} to ${endDate}`}
            navBarOptions={<ReportsLinks active={active} lang={lang} />}>
            <h2 className={'text-2xl'}>{translate('Acss transactions')}</h2>
            <div className={'mt-10'}>
                <Datatable
                    onIgnoreColumnChanged={data => {
                        setIgnoreColumns(data)
                    }}
                    data={data}
                    datatableFilters={[
                        {
                            element: (
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}>
                                    <div
                                        className={
                                            'flex items-center space-x-3'
                                        }>
                                        <Button
                                            variant={'outlined'}
                                            onClick={() => {
                                                setFilter(true)
                                            }}
                                            endIcon={<FilterAltIcon />}>
                                            Filter
                                        </Button>
                                        {startDate && endDate && (
                                            <>
                                                <Button
                                                    onClick={() => {
                                                        loading[1](true)
                                                        Inertia.get(
                                                            route(
                                                                route().current(),
                                                                {
                                                                    ...route()
                                                                        .params,
                                                                    start_date:
                                                                        startDate,
                                                                    end_date:
                                                                        endDate,
                                                                    filter_date:
                                                                        filterDate,
                                                                },
                                                            ),
                                                            {},
                                                            {
                                                                onSuccess:
                                                                    () => {
                                                                        loading[1](
                                                                            false,
                                                                        )
                                                                    },
                                                            },
                                                        )
                                                    }}
                                                    variant={'outlined'}
                                                    endIcon={
                                                        <MagnifyingGlassIcon
                                                            className={'h-4'}
                                                        />
                                                    }>
                                                    {translate('Search')}
                                                </Button>
                                                {downloadExcel ? (
                                                    <a
                                                        target={'_blank'}
                                                        href={route(
                                                            'download.excel',
                                                            {
                                                                lang,
                                                                ignore_columns,
                                                                startDate,
                                                                endDate,
                                                                filterDate,
                                                                columns,
                                                            },
                                                        )}>
                                                        <Button
                                                            type={'submit'}
                                                            className={
                                                                'whitespace-nowrap'
                                                            }
                                                            variant={'outlined'}
                                                            endIcon={
                                                                <MagnifyingGlassIcon
                                                                    className={
                                                                        'h-4'
                                                                    }
                                                                />
                                                            }>
                                                            {translate(
                                                                'Download excel',
                                                            )}
                                                        </Button>
                                                    </a>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </LocalizationProvider>
                            ),
                        },
                    ]}
                    actions={false}
                    returnColumns={data => {
                        setColumns(data)
                    }}
                    datatableRoute={route('get.report', {
                        type: 'acss-transactions',
                        lang,
                    })}
                    columns={[
                        {
                            name: 'Settled Date',
                            key: 'sdate',
                            sort: true,
                        },
                        {
                            name: 'Transaction id',
                            key: 'transid',
                            sort: true,
                        },
                        {
                            name: 'Comment',
                            key: 'COMMENT',
                            sort: true,
                            className: '!whitespace-normal',
                            limit: 50,
                        },
                        {
                            name: 'Transaction date',
                            key: 'tdate',
                            sort: true,
                            data_type: 'date',
                            format: 'YYYY/MM/DD hh:mm A',
                        },
                        {
                            name: 'Prepared by',
                            key: 'prep_by',
                            sort: true,
                        },
                        {
                            name: 'Approved by',
                            key: 'appr_by',
                            sort: true,
                        },
                        {
                            name: 'Sender name',
                            key: 'sender_name',
                            sort: true,
                        },
                        {
                            name: 'Sender account',
                            key: 'sender_acct',
                            sort: true,
                        },
                        {
                            name: 'Receiver name',
                            key: 'recv_acct',
                            sort: true,
                        },
                        {
                            name: 'Receiver account',
                            key: 'recvbr_acct',
                            sort: true,
                        },
                        {
                            name: 'Beneficiary name',
                            key: 'bene_name',
                            sort: true,
                        },
                        {
                            name: 'Currency',
                            key: 'currency',
                            sort: true,
                        },
                        {
                            name: 'Amount',
                            key: 'amount',
                            sort: true,
                            data_type: 'price',
                        },
                        {
                            name: 'Status',
                            key: 'STATUS',
                            sort: true,
                        },
                        {
                            name: 'Last update',
                            key: 'lastUpdate',
                            sort: true,
                        },
                        {
                            name: 'Settled',
                            key: 'settled',
                            sort: true,
                            data_type: 'boolean',
                            true_value: 'Yes',
                            false_value: 'No',
                        },
                    ]}
                />
            </div>
            {filter && (
                <TransactionFilterModel
                    startDate={startDate}
                    filter_date={filterDate}
                    endDate={endDate}
                    onClose={date => {
                        setStartDate(date.start_date)
                        setEndDate(date.end_date)
                        setFilterDate(date.filter_date)
                        setFilter(false)
                    }}
                    translate={translate}
                />
            )}
        </Authenticated>
    )
}

export default AcssTransactionsIndex
