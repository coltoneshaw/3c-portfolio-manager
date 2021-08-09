import React, { PureComponent } from 'react';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import NoData from '@/app/Components/Pages/Stats/Components/NoData';

import { parseISO, format } from 'date-fns'
import { parseNumber } from '@/utils/number_formatting';

import { CustomTooltip } from '@/app/Components/Charts/Tooltips';
import { Type_ProfitChart } from '@/types/Charts';


const SummaryProfitByDay = ({ data, X }: Type_ProfitChart) => {

    const renderChart = () => {
        if (data.length === 0) {
            return (<NoData />)
        } else {
            return (<ResponsiveContainer width="100%" height="100%" minHeight="300px" >
                <AreaChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}

                >
                    <CartesianGrid opacity={.3} vertical={false} />
                    <XAxis
                        dataKey="utc_date"
                        axisLine={false}
                        tickLine={false}
                        minTickGap={50}
                        tickFormatter={(str) => {
                            if (str == 'auto') return ""
                            let date = parseISO(new Date(str).toISOString())
                            return format(date, "M/d")
                        }}
                    />
                    <YAxis
                        dataKey={X}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={tick => parseNumber(tick)}
                        tickCount={10}
                        // TODO - Need to look at passing in a tick array that contains the values rounded to 100s.
                        type="number" 
                        allowDecimals={false}
                        domain={[(dataMin: number) => Math.floor(dataMin / 10 ) * 10, (dataMax: number) =>  Math.round(dataMax / 10 ) * 10]}
                    />

                    <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        // @ts-ignore
                        content={<CustomTooltip />} 
                    />
                    <defs>
                        <linearGradient id="gradiant" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={20} stopColor="#DEE3EC" stopOpacity={1} />
                            <stop offset={0} stopColor="#9BABC7" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey={X} stroke="#212B3B" strokeWidth={1.75} fill="url(#gradiant)" />
                </AreaChart>

            </ResponsiveContainer>)
        }
    }


    return (
        <div className="boxData stat-chart">
            <h3 className="chartTitle">Cumulative profit by day </h3>
            {renderChart()}

        </div>
    )
}

export default SummaryProfitByDay;



