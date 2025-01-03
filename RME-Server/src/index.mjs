import  express  from "express";
import { connectDB } from "./utils/config/dbConnection.mjs";
import routers from "./routers/index.mjs";
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();
connectDB(process.env.MONGOOSE_URL)
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(routers)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
})
