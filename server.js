const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Schema = mongoose.Schema;
const app = express();
const PORT = process.env.PORT || 3000;

// Definisanje šeme za korisnika
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
});

// Kreiranje modela korisnika
const User = mongoose.model('User', userSchema);

// Povezivanje sa MongoDB bazom podataka
mongoose.connect('mongodb+srv://amartubic1:eqlLdcWdVPiKOjcO@database.kyfuv8p.mongodb.net/moja_baza?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware za parsiranje JSON tela zahteva
app.use(bodyParser.json());

// Ruta za testiranje servera
app.get('/', (req, res) => {
    res.send('Dobrodošli na server!');
});

app.get('/api/signup', (req, res) => {
    res.send('Dobrodošli na signup stranicu!');
});
// Ruta za registraciju
app.post('/api/signup', async (req, res) => {
    console.log('Pristigao zahtev za signup:', req.body);
    try {
        const { email, username ,password, repeatPassword } = req.body;

        // Provera da li su lozinke iste
        if (password !== repeatPassword) {
            return res.status(400).json({ success: false, message: 'Lozinke se ne podudaraju.' });
        }

        // Provera da li korisnik već postoji u bazi podataka
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Korisnik sa ovim emailom već postoji.' });
        }

        // Kreiranje novog korisnika u bazi podataka
        const newUser = new User({ email,username, password });
        await newUser.save();

        res.json({ success: true, message: 'Uspešna registracija.' });
    } catch (error) {
        console.error('Došlo je do greške prilikom registracije:', error);
        res.status(500).json({ success: false, message: 'Došlo je do greške prilikom registracije.' });
    }
});

// Postavljanje servera da sluša na određenom portu
app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});


app.post('/api/login', async (req, res) => {
    console.log('Pristigao zahtev za prijavu:', req.body);

    try {
        const { email, password } = req.body;

            // Provera da li korisnik postoji u bazi podataka
            const existingUser = await User.findOne({ email, password }).lean();
            console.log(User);

        if (existingUser) {
            console.log('Uspesna prijava:', existingUser);
            res.json({ success: true, message: 'Uspesna prijava.', user: { username: existingUser.username } });
        } else {
            console.error('Neuspesna prijava: Korisnik ne postoji ili lozinka nije ispravna.');
            res.status(401).json({ success: false, message: 'Korisnik ne postoji ili lozinka nije ispravna.' });
        }
    } catch (error) {
        console.error('Došlo je do greške prilikom prijave:', error);
        res.status(500).json({ success: false, message: 'Došlo je do greške prilikom prijave.' });
    }
});




