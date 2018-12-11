import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as mongoose from "mongoose";
import * as logger from "morgan";
import PostRouter from "./routers/PostRouter";
import UserRouter from "./routers/UserRouter";

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        // setup mongoose db
        const MONGOOSE_URI = "mongodb://localhost/node-tes";
        mongoose.connect(MONGOOSE_URI || process.env.MONGOOSE_DB_URI).then(() => ({}));

        // config
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(logger("dev"));
        this.app.use(compression());
        this.app.use(cors());
    }

    private routes(): void {
        let router: express.Router;
        router = express.Router();

        this.app.use("/", router);
        this.app.use("/api/v1/posts", PostRouter);
        this.app.use("/api/v1/users", UserRouter);
    }
}

export default new Server().app;
