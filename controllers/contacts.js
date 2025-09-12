const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

// Get all contacts
const getAll = async (req, res) => {
    //#swagger.tags=['Contacts]
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

// Get a single contact by ID
const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts]
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').findOne({ _id: contactId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

// Create a new contact
const createContact = async (req, res) => {
    //#swagger.tags=['Contacts]
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
};

// Update a contact
const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts]
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
    };
    const response = await mongodb.getDatabase().db().collection('contacts').updateOne({ _id: contactId }, { set: contact });
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

// Delete a contact
const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts]
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact,
};
