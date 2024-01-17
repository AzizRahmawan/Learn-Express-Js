import http from 'http';
import book from "./book.json" assert { type: 'json' }; 

const books  = book;
const server = http.createServer((req, res) => {
    const id = Number(req.url.split('/').pop());
    if (req.url === '/books') {        
        res.writeHead(200, {'Content-Type': 'aplication/JSON'});
        res.end(JSON.stringify(books));
        return;
    }
    if (req.url === `/books/${id}`) {
        res.writeHead(200, {'Content-Type': 'aplication/JSON'});
        res.end(JSON.stringify(books.filter(book=>book.id === id)));
        return;
    } 
    res.writeHead(404, {'Content-Type': 'aplication/JSON'});
    res.end(JSON.stringify({"message":"Page Not Found!"}));
})

const port = 3000;

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})