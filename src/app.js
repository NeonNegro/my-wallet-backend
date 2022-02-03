import express from 'express';
import { signUp } from './controllers/authController.js';

const PORT = 5000;
const app = express();
app.use(express.json());

app.post("/sign-up", signUp);




app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`);
});
