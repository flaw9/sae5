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

router.get('/coordonneespointdedepot', (req, res) => {
    // Make sure we're logged in as a structure
    if (!req.session.user) return res.status(401).send('Not logged in');
    if (req.session.user.type !== 'structure') return res.status(403).send('Not a structure');

    // Get the coordonneespointdedepot
    const coordonneespointdedepot = database.query('SELECT ST_X(coordonnees) AS longitude, ST_Y(coordonnees) AS latitude FROM point_de_depot');
    if (!coordonneespointdedepot) return res.status(500).send('Database error');

    // Return the coordonneespointdedepot
    return res.json(coordonneespointdedepot);
});

router.put('/abonnement/:id', (req, res) => {
    // Make sure we're logged in as a member
    if (!req.session.user) return res.status(401).send('Not logged in');
    if (req.session.user.type !== 'adherent') return res.status(403).send('Not an member');

    if (!req.body.type) return res.status(400).send('Missing type');
    if (!req.body.montant) return res.status(400).send('Missing montant');
    if (!req.params.id) return res.status(400).send('Missing id');

    const abonnements = database.query('UPDATE abonnement SET type = ?, montant = ? WHERE id = ?', [req.body.type, req.body.montant, req.params.id]);
    if (!abonnements) return res.status(500).send('Database error');

    // Return the abonnements
    return res.json(abonnements);
});

router.get('/structure/adherents', (req, res) => {
    // Make sure we're logged in as a structure
    if (!req.session.user) return res.status(401).send('Not logged in');
    if (req.session.user.type !== 'structure') return res.status(403).send('Not a structure');

    // Get the adherents
    const adherents = database.query(`
    SELECT adherent.*, abonnements_en_cours.*
    FROM adherent
    LEFT JOIN abonnements_en_cours ON adherent.id = abonnements_en_cours.id_adherent
    WHERE adherent.id_structure = ?
    `, [req.session.user.id]);
    if (!adherents) return res.status(500).send('Database error');

    // Return the adherents
    return res.json(adherents);
});

router.get('/calendrier', (req, res) => {
    // Make sure we're logged in as a member
    if (!req.session.user) return res.status(401).send('Not logged in');
    if (req.session.user.type !== 'adherent') return res.status(403).send('Not a adherent');

    // Get the calendrier
    const calendrier = database.query(`
    SELECT jours_livrables.jour_semaine
    FROM jours_livrables
    JOIN adherent ON jours_livrables.id_structure = adherent.id_structure
    WHERE adherent.id = ?
  `, [req.session.user.id]);
    if (!calendrier) return res.status(500).send('Database error');

    // Return the calendrier
    return res.json(calendrier);
});

router.get('/depots', (req, res) => {
    // Make sure we're logged in as a member
    if (!req.session.user) return res.status(401).send('Not logged in');
    if (req.session.user.type !== 'adherent') return res.status(403).send('Not a adherent');

    // Get the points de depot
    const points_depot = database.query(`SELECT * FROM point_de_depot`);
    if (!points_depot) return res.status(500).send('Database error');

    // Return the points de depot
    return res.json(points_depot);
});

router.get('/adherent/:id', (req, res) => {
    // Make sure we're logged in as a structure
    if (!req.session.user) return res.status(401).send('Not logged in');
    if (req.session.user.type !== 'structure') return res.status(403).send('Not a structure');

    // Get the adherent
    const adherent = database.query('SELECT * FROM adherent WHERE id = ?', [req.params.id]);
    if (!adherent) return res.status(500).send('Database error');

    if (adherent.id_structure !== req.session.user.id) return res.status(403).send('Not your member');

    // Return the adherent
    return res.json(adherent);
});


module.exports = router;