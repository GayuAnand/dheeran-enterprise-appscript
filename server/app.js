process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const ImportUtil = require("./util/app-import.util");

const app = ImportUtil.Express();
const port = 8201;

// parse application/x-www-form-urlencoded
app.use(ImportUtil.BodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(ImportUtil.BodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/health', (req, res) => res.send('I\'m alive!'));

const OltRouter = require("./routers/olt.router");
app.use('/olt', OltRouter);

const GsheetRouter = require("./routers/gsheet.router");
app.use('/gsheet', GsheetRouter);

const FmsRouter = require("./routers/fms.router");
app.use('/fms', FmsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
