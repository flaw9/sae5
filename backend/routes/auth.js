const database = require('../modules/db.js');

const router = require('express').Router();

router.post('/login/adherent', (req, res) => {
    if (!req.body) return res.status(400).send('No body');
    if (!req.body.username) return res.status(400).send('No username');
    if (!req.body.password) return res.status(400).send('No password');

    const user = database.query('SELECT id FROM adherent WHERE mail = ? AND mdp_espace_client = ?', [req.body.username, req.body.password]);
    if (!user) return res.status(400).send('Incorrect credentials');
    
    req.session.user = user;
    req.session.user.type = 'adherent';
    return res.sendStatus(200);
});

router.post('/login/structure', (req, res) => {
    if (!req.body) return res.status(400).send('No body');
    if (!req.body.id) return res.status(400).send('No id');
    if (!req.body.num_identification) return res.status(400).send('No num_identification');

    const user = database.query('SELECT id FROM structure WHERE id = ? AND num_identification = ?', [req.body.id, req.body.num_identification]);
    if (!user) return res.status(400).send('Incorrect credentials');
    
    req.session.user = user;
    req.session.user.type = 'structure';
    return res.sendStatus(200);
});

router.get('/logout', (req, res) => {
    if (!req.session.user) return res.status(401).send('Not logged in');
    
    req.session.destroy();
    return res.sendStatus(200);
});

module.exports = router;