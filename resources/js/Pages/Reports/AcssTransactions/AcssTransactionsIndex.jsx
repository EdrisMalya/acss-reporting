import React from "react"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import useLanguage from "@/hooks/useLanguage"
import ReportsLinks from "@/Pages/Reports/ReportsLinks"
import Datatable from "@/Components/Datatable/Datatable"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { MobileDateTimePicker } from "@mui/x-date-pickers"
import { Button, TextField } from "@mui/material"
import { Inertia } from "@inertiajs/inertia"
import dayjs from "dayjs"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

const AcssTransactionsIndex = ({ lang, active, data, start_date, end_date }) => {
    const {translate} = useLanguage()
    const [startDate, setStartDate] = React.useState(start_date)
    const [endDate, setEndDate] = React.useState(end_date)

    return (
        <Authenticated active={'reports'} title={`Transactions from ${startDate} to ${endDate}`} navBarOptions={<ReportsLinks active={active} lang={lang} />}>
            <h2 className={'text-2xl'}>{translate('Acss transactions')}</h2>
            <div className={'mt-10'}>
                <Datatable
                    data={data}
                    datatableFilters={[
                        {
                            element: (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div className={'flex items-center space-x-3'}>
                                        <MobileDateTimePicker
                                            size={'small'}
                                            label={translate('From date')}
                                            inputFormat={'YYYY-MM-DD hh:mm A'}
                                            value={startDate}
                                            onChange={(startDateInput) => {
                                                setStartDate(dayjs(startDateInput).format('YYYY-MM-DD hh:mm A'))
                                            }}
                                            renderInput={(params) => <TextField size={'small'} {...params} />}
                                        />
                                        <MobileDateTimePicker
                                            size={'small'}
                                            label={translate('To date')}
                                            inputFormat={'YYYY-MM-DD hh:mm A'}
                                            value={endDate}
                                            onChange={(endDateInput) => {
                                                setEndDate(dayjs(endDateInput).format('YYYY-MM-DD hh:mm A'))
                                            }}
                                            renderInput={(params) => <TextField size={'small'} {...params} />}
                                        />
                                        {startDate && endDate && (
                                            <Button onClick={()=>{
                                                Inertia.get(route(route().current(), {
                                                    ...route().params,
                                                    start_date: startDate,
                                                    end_date: endDate,
                                                }))
                                            }} variant={'outlined'} endIcon={<MagnifyingGlassIcon className={'h-4'} /> }>
                                                {translate('Search')}
                                            </Button>
                                        )}
                                    </div>
                                </LocalizationProvider>
                            )
                        }
                    ]}
                    actions={false}
                    datatableRoute={route('get.report', {type: 'acss-transactions', lang})}
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
                            format: 'YYYY/MM/DD hh:mm A'
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
                            data_type: 'price'
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
                            false_value: 'No'
                        },

                    ]} />
            </div>
        </Authenticated>
    )
}

export default AcssTransactionsIndex
