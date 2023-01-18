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
                                        <MobileDateTimePicker
                                            size={'small'}
                                            label={translate('From date')}
                                            disableFuture={true}
                                            inputFormat={'YYYY-MM-DD hh:mm A'}
                                            value={startDate}
                                            onChange={startDateInput => {
                                                setDisableDates(
                                                    dayjs(startDateInput).add(
                                                        5,
                                                        'month',
                                                    ),
                                                )
                                                let f_date =
                                                    dayjs(
                                                        startDateInput,
                                                    ).format(
                                                        'YYYY-MM-DD hh:mm A',
                                                    )
                                                setStartDate(f_date)
                                            }}
                                            renderInput={params => (
                                                <TextField
                                                    size={'small'}
                                                    {...params}
                                                />
                                            )}
                                        />
                                        <MobileDateTimePicker
                                            shouldDisableDate={date => {
                                                return (
                                                    new Date(date) >
                                                    new Date(
                                                        startDate,
                                                    ).setMonth(
                                                        new Date(
                                                            startDate,
                                                        ).getMonth() + 4,
                                                    )
                                                )
                                            }}
                                            size={'small'}
                                            label={translate('To date')}
                                            inputFormat={'YYYY-MM-DD hh:mm A'}
                                            disableFuture={true}
                                            value={endDate}
                                            onChange={endDateInput => {
                                                let f_date =
                                                    dayjs(endDateInput).format(
                                                        'YYYY-MM-DD hh:mm A',
                                                    )
                                                setEndDate(f_date)
                                            }}
                                            renderInput={params => (
                                                <TextField
                                                    size={'small'}
                                                    {...params}
                                                />
                                            )}
                                        />
                                        {startDate && endDate && (
                                            <>
                                                <MuiSelect
                                                    className={'max-w-fit'}
                                                    value={filterDate}
                                                    label={translate(
                                                        'Select date',
                                                    )}
                                                    onChange={f_date => {
                                                        setFilterDate(
                                                            f_date.target.value,
                                                        )
                                                    }}
                                                    options={[
                                                        {
                                                            label: translate(
                                                                'Transaction date',
                                                            ),
                                                            value: 'tdate',
                                                        },
                                                        {
                                                            label: translate(
                                                                'Settled date',
                                                            ),
                                                            value: 'sdate',
                                                        },
                                                        {
                                                            label: translate(
                                                                'Last update',
                                                            ),
                                                            value: 'lastUpdate',
                                                        },
                                                    ]}
                                                />
                                                <Button
                                                    onClick={() => {
                                                        loading[1](false)
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
        </Authenticated>
    )
}

export default AcssTransactionsIndex
