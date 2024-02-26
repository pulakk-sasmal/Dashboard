import React, { useState, useEffect } from 'react';
import Chart from './Chart';

function Visual({eff}) {
    const [x, getx] = useState([]);
    const [y, gety] = useState([]);
    const [mbttn, setbttn] = useState('');

    const solve = async () => {
        const item = mbttn;
        const apiUrl = 'https://dashboard-7fo2.onrender.com/dashboard/visual';
        const data = {
            visual : `${item}`,
            filter : eff,
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(data => {
            getx(data.arr1);
            gety(data.arr2);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const bttn = `flex mt-2 justify-center items-center shadow-inner rounded-2xl h-8 w-20 border border-gray-300 hover:cursor-pointer hover:border-sky-400 hover:border-2 hover:shadow-md`;
    const activeBttn = `flex mt-2 justify-center items-center rounded-2xl h-8 w-20 border-sky-400 border-2 shadow-md bg-slate-100`;

    const buttons = ["Intensity", "Likelihood", "Relevance", "Start_Year", "Country", "Topics", "Region", "City"];

    useEffect(() => {
        solve();
    }, [mbttn, eff]);

    return (
        <div id='visual' className='w-full flex px-8 py-4 bg-gray-100'>
        <div className='w-full rounded-lg p-4 bg-white shadow-md shadow-gray-300 '>
            <div className='flex flex-wrap justify-around text-sm'>
                {buttons.map((item, index) =>
                    (<button className={item === mbttn ? activeBttn : bttn} id={item} key={index} onClick={() =>{
                        setbttn(item);
                    }}> {item} </button>))
                }
            </div>

            <div className='my-8 h-72 mx-8 mb-10 rounded-xl flex justify-center items-center'>
                <Chart mbttn={mbttn} x={x} y={y} />
            </div>

        </div>
        </div>
    );
}

export default Visual;
