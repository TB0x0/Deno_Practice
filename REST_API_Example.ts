// Based off flaviocopes oak example

// import application and router from Oak
import { Application, Router } from 'https://deno.land/x/oak/mod.ts'

const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || '127.0.0.1';

interface Book {
    author: string;
    title: string;
    pub_date: number;
}


let books: Array<Book> = [          // Create an array of Book interfaces
    {
        author: 'George Orwell',
        title: '1984',
        pub_date: 1949
    },
    {
        author: 'Charles Dickens',
        title: 'Great Expectations',
        pub_date: 1860
    },
]

export const getBooks = ({ response }: { response: any}) =>
{
    response.body = books;
}

export const getBook = ({
    params,
    response,
}: {
    params: {
        title: string
    }
    response: any
}) => {
    const book = books.filter((book) => book.title === params.title)
    if (book.length) {
        response.status = 200;
        response.body = book[0];
        return;
    }

    response.status = 400;
    response.body = { msg: `No record of ${params.title}` }
}

export const addBook = async ({
    request,
    response,
}: {
    request: any
    response: any
}) => {
    const body = await request.body();
    const { author, title, pub_date }: { author: string; title: string; pub_date: number } =
    body.value;
    books.push({
        author: author,
        title: title,
        pub_date: pub_date,
    })

    response.body = { msg: 'ACCEPTED' };
    response.status = 200;
}
// Create Oak objects
const router = new Router();
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}...`);

await app.listen(`${HOST}:${PORT}`);