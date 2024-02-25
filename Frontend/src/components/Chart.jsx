import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'; 

const ChartComponent = ({ mbttn, x, y }) => {
    const chartRef = useRef(null); 
    const [chartData, setChartData] = useState(null);
    let chartInstance = null; 

    useEffect(() => {
        if (chartRef.current && mbttn) {
            if (chartInstance) {
                chartInstance.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            const initialChartData = {
                labels: x,
                datasets: [{
                    label: `${mbttn}`,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    data: y
                }]
            };
            setChartData(initialChartData);
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: initialChartData,
                options: {
                    scales: { y: { beginAtZero: true},},
                    animation: { easing: 'easeInOutQuad',}
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Chart Title',
                        font: { size: 30 }
                    }
                }
            });
        }

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [x, y]); 
    
    if (mbttn && (x.length > 1 || (x.length == 1 && x[0] != null))) {
        return <div className="mt-10 chart-container w-full h-full flex items-center justify-center mb-20 overflow-hidden"><canvas ref={chartRef} /></div>;
    } else {
        return <div className='w-full h-full mx-20 rounded-lg flex items-center justify-center font-semibold text-slate-400 text-md'> Data not found !!</div>;
    }
};

export default ChartComponent;
