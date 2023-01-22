import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { useForm, usePage } from '@inertiajs/inertia-react'
import DateRangePicker from 'react-date-range/dist/components/DateRangePicker'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'
import DateRange from 'react-date-range/dist/components/DateRange'
import dayjs from 'dayjs'
import MuiSelect from '@/Components/MUISelect' // theme css file
import swal from 'sweetalert'

const TransactionFilterModel = ({
    translate,
    onClose,
    item,
    startDate,
    endDate,
    filter_date,
}) => {
    const { lang } = usePage().props

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ])

    const [filterDate, setFilterDate] = React.useState(filter_date)

    const handleClose = () => {
        onClose({
            start_date: dayjs(state[0].startDate).format('YYYY-MM-DD'),
            end_date: dayjs(state[0].endDate).format('YYYY-MM-DD'),
            filter_date: filterDate,
        })
    }

    const { post, processing, setData, data, errors, put } = useForm({
        name: item?.name,
    })

    const handleChange = event => {
        setData(event.target.name, event.target.value)
    }

    const monthDiff = (d1, d2) => {
        let months
        months = (d2.getFullYear() - d1.getFullYear()) * 12
        months -= d1.getMonth() + 1
        months += d2.getMonth()
        return months <= 0 ? 0 : months
    }

    React.useEffect(() => {
        if (startDate !== null && endDate !== null) {
            setState([
                {
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    key: 'selection',
                },
            ])
        }
    }, [])

    return (
        <Dialog open={true} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle>{translate('Filters')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => {
                            setState([item.selection])
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={state}
                    />
                    <Button
                        onClick={() => {
                            setState([
                                {
                                    startDate: new Date(),
                                    endDate: new Date(),
                                    key: 'selection',
                                },
                            ])
                        }}
                        size={'small'}
                        variant={'outlined'}>
                        {translate('Reset date')}
                    </Button>
                    <div className={'mt-3'}>
                        <MuiSelect
                            value={filterDate}
                            label={translate('Select date')}
                            onChange={f_date => {
                                setFilterDate(f_date.target.value)
                            }}
                            options={[
                                {
                                    label: translate('Transaction date'),
                                    value: 'tdate',
                                },
                                {
                                    label: translate('Settled date'),
                                    value: 'sdate',
                                },
                                {
                                    label: translate('Last update'),
                                    value: 'lastUpdate',
                                },
                            ]}
                        />
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    onClick={handleClose}
                    color={'success'}
                    variant={'outlined'}
                    loading={processing}>
                    {translate('Ok')}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default TransactionFilterModel
