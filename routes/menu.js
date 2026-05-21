const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET
router.get('/', (req, res) => {
  db.query('SELECT * FROM menu', (err, results) => {
    res.json(results);
  });
});

// POST
router.post('/', (req, res) => {
  const { detalle, precio } = req.body;

  db.query(
    'INSERT INTO menu (detalle, precio) VALUES (?, ?)',
    [detalle, precio],
    () => res.send('ok')
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  db.query(
    'DELETE FROM menu WHERE id = ?',
    [req.params.id],
    () => res.send('eliminado')
  );
});

module.exports = router;