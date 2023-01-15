import React from "react"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import useLanguage from "@/hooks/useLanguage"
import ReportsLinks from "@/Pages/Reports/ReportsLinks"

const ReportIndex = ({ lang }) => {
    const {translate} = useLanguage()
    return (
        <Authenticated active={'reports'} title={translate('Reports')} navBarOptions={<ReportsLinks active={''} lang={lang} />}>
            <h2 className={'text-3xl text-center mt-64'}>{translate('Reporting section')}</h2>
        </Authenticated>
    )
}

export default ReportIndex
