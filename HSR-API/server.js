
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


app.use(express.json());


app.get('/api/characters', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM characters');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching characters' });
    }
});

app.get('/api/characters/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM characters WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Character not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching character' });
    }
});

app.post('/api/characters', async (req, res) => {
    const { name, path, rarity, description } = req.body;
    if (!name || !path || !rarity || !description) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    
    try {
        const { rows } = await pool.query(
            'INSERT INTO characters (name, path, rarity, description) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, path, rarity, description]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating character' });
    }
});

app.get('/api/lightcones', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM light_cones');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching light cones' });
    }
});

app.get('/api/relics', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM relics');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching relics' });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});


app.listen(port, () => {
    console.log(`HSR API server running on port ${port}`);
});