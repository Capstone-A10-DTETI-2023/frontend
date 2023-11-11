import React from "react";
import EChartsReact from "echarts-for-react";

const LineChart = ({ height, width = '100%', name = 'Unnamed' }: { height: number, width?: string, name: string }) => {
    const options = {
        title: {
            text: '',
        },
        grid: { top: 24, right: 8, bottom: 16, left: 36 },
        legend: {
            data: [name],
            right: 'right'
        },
        xAxis: {
            type: 'category',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5],
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: name,
                data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 329],
                type: 'line',
                smooth: true,
            },
        ],
        tooltip: {
            trigger: 'axis',
        },
    };

    return (
        <>
            <EChartsReact
                option={options}
                style={{ maxHeight: height, width: width }}
            />
        </>
    );
}

export default LineChart;