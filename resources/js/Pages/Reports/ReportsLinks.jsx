import React from 'react'
import ProtectedComponent from '@/Components/ProtectedComponent'
import { Link } from '@inertiajs/inertia-react'
import { Button } from '@mui/material'
import {GlobeAltIcon, LanguageIcon} from '@heroicons/react/24/outline'
import useLanguage from '@/hooks/useLanguage'

const ReportsLinks = ({ active, lang }) => {
    const { translate } = useLanguage()
    const activeLink = () => {
        switch (active) {
            case 'acss-transactions':
                return 'acss-transactions'
        }
    }
    return (
        <>
            <ProtectedComponent role={'acss-transactions-access'}>
                <Link href={route('get.report', { lang, type: 'acss-transactions' })}>
                    <Button
                        variant={
                            activeLink() === 'acss-transactions'
                                ? 'contained'
                                : 'outlined'
                        }>
                        {translate('Acss transactions')}
                    </Button>
                </Link>
            </ProtectedComponent>
        </>
    )
}

export default ReportsLinks
