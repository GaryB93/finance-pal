import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';

dotenv.config();

let port = process.env.PORT;
if (port === null || port === '' || port === undefined) {
    port = 3000;
}

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.use('/api/user', userRouter);

// app.use('/api/cookies', )

// app.use('/api/finances', )


app.listen(port, () => {
    console.log(`Server started listening on port: ${port}`);
});