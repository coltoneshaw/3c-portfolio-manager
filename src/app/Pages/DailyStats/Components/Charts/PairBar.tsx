import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NoData from '@/app/Pages/Stats/Components/NoData';
import {currencyTickFormatter, currencyTooltipFormatter} from '@/app/Components/Charts/formatting'

import {defaultCurrency} from '@/types/config'

import type { Type_Tooltip } from '@/types/Charts';
import { dynamicSort } from '@/utils/helperFunctions';


type params = {
    data: queryDealByPairByDayReturn[] | botQueryDealByDayReturn[]
    defaultCurrency: defaultCurrency,
    metric: 'top' | 'bottom',
    type: 'pair' | 'bot_name'
}

const dataFilter = ({ data = [] }: params) => {

    let lengthAdjustedData = [...data].sort(dynamicSort('-totalProfit'));
    let indexFilter = data.length > 5;

    if (indexFilter) {
        return lengthAdjustedData
        .filter( (pair, index) => index < 5)
    }


    return lengthAdjustedData

}

const PairBar = (params: params) => {
    const { data = [], defaultCurrency, type } = params

    if (!data || data.length === 0) return <NoData/>
    return (
            <ResponsiveContainer width="100%" height="90%" minHeight="300px">
                <BarChart
                    width={500}
                    height={200}
                    data={dataFilter(params)}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    stackOffset="expand"
                    maxBarSize={50}
                    barGap={1}
                >
                    <Legend/>
                    <CartesianGrid opacity={.3} vertical={false}/>

                    {/* TODO - pass the custom props down properly here.  */}
                    {/* @ts-ignore */}
                    <Tooltip content={<CustomTooltip formatter={(value:any) => currencyTooltipFormatter(value, defaultCurrency)} />} cursor={{strokeDasharray: '3 3', opacity: .2}}/>
                    <XAxis
                        dataKey={type}
                        minTickGap={-200}
                        axisLine={false}
                    />

                    <YAxis tickFormatter={(value: any) => currencyTickFormatter(value, defaultCurrency)}/>


                    <Bar dataKey="totalProfit" fill="var(--chart-metric1-color)" name='Total Profit'/>
                    <Bar dataKey="numberOfDeals" fill="var(--chart-metric3-color)" name='# of Deals'/>

                </BarChart>
            </ResponsiveContainer>
    )
}


function CustomTooltip({ active, payload, label, formatter }: Type_Tooltip) {
    if (!active || !payload || payload[0] == undefined) {
        return null
    }

    const data:queryDealByPairByDayReturn = payload[0].payload
    const {totalProfit, numberOfDeals} = data;
    return (
        <div className="tooltip">
            <h4>{label}</h4>
            <p><strong>Total Profit:</strong> {formatter(totalProfit)}</p>
            <p><strong>Deal Count:</strong>{numberOfDeals}</p>
        </div>
    )
}

export default PairBar;