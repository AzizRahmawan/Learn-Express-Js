import express from "express";
import book from "./book.json" assert { type: 'json' };
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3555;
const books = book;
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.json('Hello World!');
});
app.get('/profile', (req, res) => {
    res.render('profile', {name: 'Jhon Doe'});
})
app.get('/web/books', (req, res) => {
    res.render('books', { books })
});
app.get('/books/:id', (req, res) => {
    res.json(books.find(book=>book.id === Number(req.params.id)));
});
app.get('/books', (req, res) => {
    const query = req.query.search;
    if (query) {
        const filtered = books.filter((book) => 
            book.judul.toLowerCase().includes((query).toLowerCase()),
        );
        res.json(filtered);
        return;
    }
    res.json(books);
    return
});

app.post('/books', function (req, res) {
    const book = req.body;
    const newId = books.length + 1;
    books.push({id: newId, ...book});
    res.json({id: newId, ...book});
});
app.put('/books/:id', function(req,res) {
    const id = Number(req.params.id);
    let bookId = books.find(book=>book.id === id);
    bookId = {id, ...req.body};
    console.log(bookId);
    books[book.id-1] = bookId;
    res.json(books);
});
app.delete('/books/:id', function(req, res) {
    const id = Number(req.params.id);
    // books.splice(books.indexOf(id));
    books.splice(books.findIndex((book) => book.id === id), 1);
    res.json(books);
});

app.listen(port, () => {
    console.log(`Server Running  on Port ${port}`)
});