const express = require('express');
const Contact = require('../models/contact');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.get(':id', async (req, res) => {
    const contactID = req.params.id;
    try {
        const contacts = await Contact.findByID();
        if (!contacts) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
module.exports = router;