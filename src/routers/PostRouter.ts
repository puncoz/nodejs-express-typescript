import {Request, Response, Router} from "express";
import Post from "../models/Post";

class PostRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.routes();
    }

    public index(req: Request, res: Response): void {
        Post.find({}).then(data => {
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
        const slug: String = req.params.slug;

        Post.findOne({slug}).then(data => {
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
        const {title, slug, content, featuredImage} = req.body;
        const post = new Post({title, slug, content, featuredImage});

        post.save().then(data => {
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
        const slug: String = req.params.slug;

        Post.findOneAndUpdate({slug}, req.body).then(data => {
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
        const slug: String = req.params.slug;

        Post.findOneAndRemove({slug}).then(data => {
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
        this.router.get("/:slug", this.show);
        this.router.put("/:slug", this.update);
        this.router.delete("/:slug", this.delete);
    }
}

const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;
