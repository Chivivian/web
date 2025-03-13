import express from 'express';
// import { blogPost } from './postData.js';
import bodyParser from 'body-parser';
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
const submit = [];

app.use(express.static('public'));

//edit button
app.get('/', (req, res) => {
    res.render('home', { submit })
});

app.get('/form',(req, res) => {
    res.render('form');
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

app.get('/form',(req, res) => {
    res.render('form', { submit });
});
app.post('/submit', (req, res) => {
    submit.push(req.body);
    res.redirect('/');
});
app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const entry = submit[id];
    res.render('edit', { entry, id });
});

app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    submit.splice(id, 1);
    res.redirect('/');
});
app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    submit[id] = req.body;
    res.redirect('/');
})
app.use((req, res) => {
    res.status(404).render('404');

})
app.use((err,req,res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
})

/////

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})