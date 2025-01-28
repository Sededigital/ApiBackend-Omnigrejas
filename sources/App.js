const app = express()

const router = express.Router();

const route = router.get('/', (req, res, next) => {    
    res.status(200).send({
        title: "Omnigrejas API",
        version: "0.0.1"
    });
});

app.use('/', route);
module.exports = app;