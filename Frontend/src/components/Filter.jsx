import React, {useState} from 'react';
import InputFilter from './InputOpt';


function Filter({scrollToVisual, workEff}) {
    const [year, setyear] = useState('');
    const [topic, settopic] = useState('');
    const [sector, setsector] = useState('');
    const [region, setregion] = useState('');
    const [country, setcountry] = useState('');
    const [city, setcity] = useState('');
    const [source, setsource] = useState('');
    const [pest, setpest] = useState('');
    
    const setFunction = (variable, value) => {
        if(variable == 'end_year') setyear(value);
        if(variable == 'topic') settopic(value);
        if(variable == 'sector') setsector(value);
        if(variable == 'region') setregion(value);
        if(variable == 'country') setcountry(value); 
        if(variable == 'city') setcity(value);
        if(variable == 'source') setsource(value);
        if(variable == 'pestle') setpest(value);
    };

    const clickApplyFilter = async () => {
        const data = {
            end_year : `${year}`,
            topic : `${topic}` ,
            sector : `${sector}` ,
            region : `${region}` ,
            country : `${country}` ,
            city : `${city}`, 
            soruce: `${source}`,
            pestle: `${pest}`,
        };

        scrollToVisual();
        workEff(data);
    };

    return ( 
        <div className='w-full px-8 py-4 bg-gray-100'>
        <div className='w-full rounded-lg p-5 bg-white shadow-md shadow-gray-300 text-sm z-5'>
            <div className='mt-4 flex flex-wrap justify-evenly px-2 text-xs'>
                <InputFilter variable={"end_year"} setFunction={setFunction}/>
                <InputFilter variable={"topic"} setFunction={setFunction}/>
                <InputFilter variable={"sector"} setFunction={setFunction}/>
                <InputFilter variable={"region"} setFunction={setFunction}/>
                <InputFilter variable={"country"} setFunction={setFunction}/>
                <InputFilter variable={"city"} setFunction={setFunction}/>
                <InputFilter variable={"source"} setFunction={setFunction}/>
                <InputFilter variable={"pestle"} setFunction={setFunction}/>
                <InputFilter variable={"SWOT"} setFunction={setFunction}/>
            </div>   
            <button className='w-20 h-8 ml-8 mr-auto font-semibold rounded-lg flex justify-center items-center text-white text-xs bg-sky-500 hover:bg-blue-600'
                onClick={clickApplyFilter}>
                Apply filter
            </button>

        </div>
        </div>
    );
}

export default Filter;