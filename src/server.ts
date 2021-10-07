require('dotenv').config();
import express from "express";
import auth from './middleware/auth';
import admAuth from './middleware/authadm';
import authRoutes from './routes/auth';
import noAuthRoutes from './routes/noauth_routes'; 
import admRoutes from "./routes/adm_routes";
import routes from "./routes/auth_routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/", noAuthRoutes);
app.use("/", auth, routes);
app.use("/", admAuth, admRoutes);
app.listen(3333);