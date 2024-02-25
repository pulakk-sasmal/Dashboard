import express from "express";
import Dashboard from "../db/model.js";

const router = express.Router();
router.use(express.json());

const getFilteredData = async (filter) => {
    try {
        const dataArray = await Dashboard.find();
        const filteredData = dataArray.filter(item => {
            for (let key in filter) {
                if (filter[key] !== '') { 
                    if(item[key] === '' || item[key] !== filter[key]) return false; 
                }
            }
            return true;
        });
        return filteredData;
    } catch (error) {
        console.error("Error in getFilteredData:", error);
        throw error;
    }
}

const getChartData = async (data, visualProperty) => {
    try {
        if(data.length === 0) return {};

        const propertyName = visualProperty.toLowerCase();
        const propertyMap = new Map();

        for (let obj of data) {
            if(obj[propertyName] === '') continue;
            const count = propertyMap.get(obj[propertyName]) || 0;
            propertyMap.set(obj[propertyName], count + 1);
        }

        const x = [...propertyMap.keys()];
        const y = [...propertyMap.values()];

        return { arr1: x, arr2: y };
    } catch (error) {
        console.error("Error in getChartData:", error);
        throw error;
    }
}

router.post('/visual', async (req, res) => {
    try {
        const { visual, filter } = req.body;
        const filteredData = await getFilteredData(filter);
        const chartData = await getChartData(filteredData, visual);
        res.status(200).json(chartData);
    } catch (error) {
        console.error("Error in POST /visual:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
