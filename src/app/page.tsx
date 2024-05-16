import NameListIcon from '@/components/Icons/NameListIcon'
import ShiftChartIcon from '@/components/Icons/ShiftChartIcon'
import PageLinkCard from '@/components/PageLinkCard'

const page = () => {
    return (
        <main className='p-48 flex gap-28 flex-wrap justify-center'>
            <PageLinkCard url='members'>
                <NameListIcon />
                名簿
            </PageLinkCard>
            <PageLinkCard url='shifts'>
                <ShiftChartIcon />
                シフト表
            </PageLinkCard>
        </main>
    )
}

export default page