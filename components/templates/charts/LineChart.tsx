import React, { useEffect, useState } from "react";
import EChartsReact from "echarts-for-react";
import lodash from 'lodash'

const LineChart = ({ height, width = '100%', name = 'Unnamed' }: { height: number, width?: string, name: string }) => {

    const maxLength = 10;
    const msInterval = 1000;

    const defaultOption = {
        title: {
            text: '',
        },
        grid: { top: 24, right: 8, bottom: 20, left: 36 },
        legend: {
            data: [name],
            right: 'right'
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: ['1', '2', '3', '4', '1', '2', '3', '4', '1']
        },
        yAxis: {
            type: 'value',
            max: 20,
            min: 0
        },
        series: [
            {
                name: name,
                type: 'line',
                smooth: true,
                data: (function () {
                    let res = [];
                    let len = 0;
                    while (len < maxLength) {
                        res.push((Math.random() * 10 + 5).toFixed(1));
                        len++;
                    }
                    return res;
                })()
            },
        ],
        tooltip: {
            trigger: 'axis',
        },
    };

    const [option, setOption] = useState(defaultOption);

    const generateRandomData = () => {
        const axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
        const newOption = lodash.cloneDeep(option); // immutable

        const data = newOption.series[0].data;
        data.shift();
        data.push((Math.random() * 10 + 5).toFixed(1));

        newOption.xAxis.data.shift();
        newOption.xAxis.data.push(axisData);

        setOption(newOption);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            generateRandomData();
        }, msInterval)

        return () => clearInterval(timer)
    })

    return (
        <>
            <EChartsReact
                option={option}
                style={{ maxHeight: height, width: width }}
            />
        </>
    );
}

export default LineChart;