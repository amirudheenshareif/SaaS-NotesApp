import express, { urlencoded } from 'express';
import cors from 'cors';
import { connectToDataBase } from './config/mongodb.js';
import { loginController } from './controllers/login.js';
// import { testController } from './controllers/test.js';
import { notesRouter } from './routes/notes.routes.js';
import { authMiddleWare } from './middleware/auth.js';
import { upgradePlan} from './controllers/upgradePlan.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded(true));
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.use("/notes",authMiddleWare, notesRouter)
app.post("/login",loginController);
app.post("/upgrade",authMiddleWare, upgradePlan);
// app.post("/test",testController);


app.listen(3000, async () => {
    await connectToDataBase();
    console.log("Server running in Port 3000");
    
})

