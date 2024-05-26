const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', (req, res) => {
    Contact.find({})
        .then(contacts => {
            return res.render('home', {
                title: "Contact List",
                contact_list: contacts
            });
        })
        .catch(err => {
            console.error("Error in fetching contacts from db:", err);
            return res.status(500).send("Internal Server Error");
        });
});

app.post('/create-contact', (req, res) => {
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
    .then(newContact => {
        console.log('New contact created:', newContact);
        return res.redirect('back');
    })
    .catch(err => {
        console.error('Error in creating a contact:', err);
        return res.status(500).send("Internal Server Error");
    });
});

app.get('/delete-contact', (req, res) => {
    const contactId = req.query.id;
    Contact.findByIdAndDelete(contactId)
        .then(() => {
            console.log('Contact deleted successfully');
            return res.redirect('back');
        })
        .catch(err => {
            console.error('Error in deleting contact:', err);
            return res.status(500).send("Internal Server Error");
        });
});

app.listen(port, (err) => {
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup! My Server is running on Port', port);
});
