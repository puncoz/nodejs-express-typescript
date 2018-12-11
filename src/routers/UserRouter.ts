import {Request, Response, Router} from "express";
import User from "../models/User";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.routes();
    }

    public index(req: Request, res: Response): void {
        User.find({}).then(data => {
            res.json({
                status: 200,
                data
            });
        }).catch(err => {
            const status = req.statusCode;
            res.json({
                status,
                err
            });
        });
    }

    public show(req: Request, res: Response): void {
        const username: String = req.params.username;

        User.findOne({username}).then(data => {
            res.json({
                status: 200,
                data
            });
        }).catch(err => {
            const status = req.statusCode;
            res.json({
                status,
                err
            });
        });
    }

    public store(req: Request, res: Response): void {
        const {name, username, email, password} = req.body;
        const user = new User({name, username, email, password});

        user.save().then(data => {
            res.json({
                status: 200,
                data
            });
        }).catch(err => {
            const status = req.statusCode;
            res.json({
                status,
                err
            });
        });
    }

    public update(req: Request, res: Response): void {
        const username: String = req.params.username;

        User.findOneAndUpdate({username}, req.body).then(data => {
            res.json({
                status: 200,
                data
            });
        }).catch(err => {
            const status = req.statusCode;
            res.json({
                status,
                err
            });
        });
    }

    public delete(req: Request, res: Response): void {
        const username: String = req.params.username;

        User.findOneAndRemove({username}).then(data => {
            res.json({
                status: 200,
                data
            });
        }).catch(err => {
            const status = req.statusCode;
            res.json({
                status,
                err
            });
        });
    }

    public routes(): void {
        this.router.get("/", this.index);
        this.router.post("/", this.store);
        this.router.get("/:username", this.show);
        this.router.put("/:username", this.update);
        this.router.delete("/:username", this.delete);
    }
}

const userRouter = new UserRouter();
userRouter.routes();

export default userRouter.router;
