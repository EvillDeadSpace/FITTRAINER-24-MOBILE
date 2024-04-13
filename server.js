const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Schema = mongoose.Schema;
const app = express();
const PORT = process.env.PORT || 3000;

const jwt = require('jsonwebtoken');

// Definisanje šeme za korisnika
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    image: String,
    role: String,
    price: Number,
    specialization: String,
    description: String,
    duration: Number,
    day:Number,
    favorites: [String] // Referenca na šemu za omiljene stavke
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

app.get('/api/username/:username', async (req, res) => {
    try {
        const { username } = req.params; // Dobavljanje korisničkog imena iz URL-a
        const user = await User.find({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'Korisnik nije pronađen.' });
        }

        res.json(user);
    } catch (err) {
        console.error('Greška prilikom dohvaćanja trenera iz baze:', err);
        res.status(500).json({ error: 'Greška prilikom dohvaćanja trenera iz baze' });
    }
});






app.get('/api/signup', (req, res) => {
    res.send('Dobrodošli na signup stranicu!');
});
// Ruta za registraciju
app.post('/api/signup', async (req, res) => {
    console.log('Pristigao zahtev za signup:', req.body);
    try {
        const { email, username, password, repeatPassword, image, role } = req.body;

        // Provera da li su lozinke iste
        if (password !== repeatPassword) {
            return res.status(400).json({ success: false, message: 'Lozinke se ne podudaraju.' });
        }

        // Provera da li korisnik već postoji u bazi podataka
        const existingUser = await User.findOne({ email });

        const exisingUsername = await User.findOne({ username });

        if (exisingUsername) {
            return res.status(400).json({ success: false, message: 'Korisnik sa ovim usernamom već postoji.' });
        }

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Korisnik sa ovim emailom već postoji.' });
        }

        // Kreiranje novog korisnika u bazi podataka
        const newUser = new User({ email, username, password, image, role });
        await newUser.save();

        // Generisanje JWT tokena
        const secretKey = 'tajna'; // Promijenite s dinamičkim tajnim ključem kasnije
        const token = jwt.sign({ email, password }, secretKey, { expiresIn: '1h' });

        // Ispisivanje tokena u konzoli
        console.log('Generisan JWT token:', token);

        res.json({ success: true, message: 'Uspešna registracija.' });
    } catch (error) {
        console.error('Došlo je do greške prilikom registracije baza:', error);
        res.status(500).json({ success: false, message: 'Došlo je do greške prilikom registracije.' });
    }
});

// Postavljanje servera da sluša na određenom portu
app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});


app.get('/api/coaches', async (req, res) => {
    try {

        const coaches = await User.find({ role: 'coach' });
        res.json(coaches);
    } catch (err) {
        console.error('Greška prilikom dohvaćanja trenera iz baze:', err);
        res.status(500).json({ error: 'Greška prilikom dohvaćanja trenera iz baze' });
    }
});


app.post('/api/login', async (req, res) => {
    console.log('Pristigao zahtev za prijavu:', req.body);

    try {
        const { email, password } = req.body;

        // Provera da li korisnik postoji u bazi podataka
        const existingUser = await User.findOne({ email, password }).lean();
        console.log(User);

        const secretKey = 'tajna'; // Promijenite s dinamičkim tajnim ključem kasnije
        const token = jwt.sign({ email, password }, secretKey, { expiresIn: '1h' });

        if (existingUser) {
            console.log('Uspesna prijava:', existingUser);
            res.json({ success: true, message: 'Uspesna prijava.', user: { username: existingUser.username }, token: token, });
        } else {
            console.error('Neuspesna prijava: Korisnik ne postoji ili lozinka nije ispravna.');
            res.status(401).json({ success: false, message: 'Korisnik ne postoji ili lozinka nije ispravna.' });
        }

    } catch (error) {
        console.error('Došlo je do greške prilikom prijave:', error);
        res.status(500).json({ success: false, message: 'Došlo je do greške prilikom prijave.' });
    }
});

app.post('/api/user/addfavorite/:username/:itemId', async (req, res) => {
    try {
        const { username } = req.params;
        const { itemId } = req.body;
        console.log('Pristiglo korisničko ime:', username);

        // Pronađi korisnika u bazi podataka po korisničkom imenu
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Korisnik nije pronađen.' });
        }

        // Provjeri postoji li svojstvo favorites na korisniku
        if (!user.favorites) {
            user.favorites = []; // Ako ne postoji, inicijaliziraj ga kao prazan niz
        }

        // Dodaj stavku u omiljene stavke korisnika
        user.favorites.push(itemId);

        await user.save();

        return res.json({ success: true, message: 'Stavka dodana u omiljene.' });
    } catch (error) {
        console.error('Došlo je do greške prilikom dodavanja stavke u omiljene:', error);
        res.status(500).json({ success: false, message: 'Došlo je do greške prilikom dodavanja stavke u omiljene.' });
    }
});

app.get('/api/user/favorites/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Korisnik nije pronađen.' });
        }

        // Vrati omiljene stavke korisnika
        res.json({ success: true, favorites: user.favorites });
    } catch (error) {
        console.error('Došlo je do greške prilikom dohvatanja omiljenih stavki:', error);
        res.status(500).json({ success: false, message: 'Došlo je do greške prilikom dohvatanja omiljenih stavki.' });
    }
});

app.post('/api/user/removefavorite/:username/:itemId', async (req, res) => {
    try {
        const { username, itemId } = req.params;

        // Pronađi korisnika u bazi podataka
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Korisnik nije pronađen.' });
        }

        // Provjeri da li je stavka označena kao omiljena
        const itemIndex = user.favorites.indexOf(itemId);
        if (itemIndex === -1) {
            return res.status(400).json({ success: false, message: 'Stavka nije označena kao omiljena.' });
        }

        // Ukloni stavku iz omiljenih
        user.favorites.splice(itemIndex, 1);
        await user.save();

        // Vrati uspješan odgovor
        return res.json({ success: true, message: 'Stavka uklonjena iz omiljenih.' });
    } catch (error) {
        console.error('Došlo je do greške prilikom uklanjanja stavke iz omiljenih:', error);
        res.status(500).json({ success: false, message: 'Došlo je do greške prilikom uklanjanja stavke iz omiljenih.' });
    }
});




app.get('/api/user/:username', async (req, res) => {

    const { specilization, price } = req.body;

    try {
        const { username } = req.params;
        const user = await User.find({ username: username });

        if (!user || !user.length) {
            return res.status(404).json({ error: 'Korisnik nije pronađen.' });
        }

        res.json(user);
    } catch (err) {
        console.error('Greška prilikom dohvaćanja trenera iz baze:', err);
        res.status(500).json({ error: 'Greška prilikom dohvaćanja trenera iz baze' });
    }
});

app.post('/api/coaches/price', async (req, res) => {
    const { username, price, specialization, duration, description, day } = req.body;

    try {
      // Pronađi trenera u bazi podataka prema korisničkom imenu
      const coach = await User.findOne({ username: username });

      if (!coach) {
        return res.status(404).json({ error: 'Trener nije pronađen.' });
      }
      coach.day = day;
      coach.duration= duration;
      coach.description = description;

      coach.specialization = specialization;

      // Postavi cijenu treneru
      coach.price = price;

      // Spremi promjene u bazu podataka
      await coach.save();

      res.status(200).json({ message: 'Cijena uspješno dodana treneru.' });
    } catch (error) {
      console.error('Greška prilikom dodavanja cijene treneru:', error);
      res.status(500).json({ error: 'Greška prilikom dodavanja cijene treneru.' });
    }
  });


function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Ako nema tokena, vrati grešku
    }

    jwt.verify(token, 'tajna', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Ako je token nevažeći, vrati grešku
        }

        req.user = user;
        next(); // Ako je token važeći, nastavi sa obradom zahteva
    });
}



