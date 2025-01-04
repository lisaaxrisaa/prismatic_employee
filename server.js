const { express } = require('./common');
const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/', require('./employees'));

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});
