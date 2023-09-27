import express from 'express';
import dotenv from 'dotenv';

import userRouter from './routes/user.js';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/api/user', userRouter);

// app.use('/api/cookies', )

// app.use('/api/finances', )


app.listen(port, () => {
    console.log(`Server started listening on port: ${port}`);
});