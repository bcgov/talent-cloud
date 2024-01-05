const path = require("path");
const express = require("express");
const compression = require('compression')

const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
//TODO verify the correct limit to set
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

const bodyParser = require('body-parser');
const root = path.join(__dirname, 'build');

const app = express()

app.use(compression())
app.use(bodyParser.json());

app.use(express.static(root));
app.use(limiter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'"],
    },
  }),
);

const port = process.env.PORT;
console.log(process.env.NODE_ENV)

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port, () => {
  console.log("server started on port" + `${port}`);
});