import express from 'express';
import cors from 'cors';
import connection from './db/connection.js';
import Dashboard from './db/model.js';
import router from './router/router.js';

const app = express();
const PORT = 4000;

// Set CORS headers
app.use(cors());
connection();

app.use(express.json());

app.use('/dashboard', router);

app.get('/suggestion/:req', async (req, res) => {
    try {
        const requestParam = req.params.req;
        const arr = await Dashboard.aggregate([
            { $group: { _id: `$${requestParam}` } },
            { $sort: { _id: 1 } }
        ]);
        res.send(arr);
    } catch (error) {
        console.error('Error in GET /suggestion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
