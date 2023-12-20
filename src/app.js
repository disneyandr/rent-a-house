// importando o express
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
// chamando as rotas
import routes from "./routes";

class App {
    constructor() {
        this.server = express();

        const uri =
            "mongodb+srv://devhouse:Dh200820@cluster0.6pvfh.mongodb.net/?retryWrites=true&w=majority";

        mongoose
            .connect(uri, {
                useNewUrlParser: true, // Corrigindo aqui
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log("Conexão com o MongoDB estabelecida com sucesso.");
            })
            .catch((error) => {
                console.error("Erro ao conectar ao MongoDB:", error);
            });

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(
            "/files",
            express.static(path.resolve(__dirname, "..", "uploads")),
        );
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
