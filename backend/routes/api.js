const database = require('../modules/db.js');

const router = require('express').Router();

router.get('/abonnements', (req, res) => {
    // Make sure we're logged in as a structure
    if (!req.session.user) return res.status(401).send('Not logged in');
    if (req.session.user.type !== 'structure') return res.status(403).send('Not a structure');

    // Get the abonnements
    const abonnements = database.query('SELECT * FROM abonnement WHERE structure = ?', [req.session.user.id]);
    if (!abonnements) return res.status(500).send('Database error');

    // Return the abonnements
    return res.json(abonnements);
});

module.exports = router;