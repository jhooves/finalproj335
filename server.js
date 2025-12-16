const path = require('path');

const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const { connectToDatabase } = require('./src/db');

const entriesRouter = require('./src/routes/entries');
const weatherRouter = require('./src/routes/weather');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/entries/new');
});

app.use('/entries', entriesRouter);
app.use('/weather', weatherRouter);

app.use((req, res) => {
  res.status(404).render('pages/not-found', { title: 'Not Found' });
});

const port = process.env.PORT || 3000;

(async () => {
  await connectToDatabase(process.env.MONGODB_URI);
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${port}`);
  });
})();
