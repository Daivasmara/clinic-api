require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const {
  cors,
  helmet,
  morgan,
  notFound,
  errorHandler,
} = require('./middlewares');
const DB = require('./db');
const { v1 } = require('./versions');
const { ENVIRONMENT } = require('./utils/helpers/constants');
const swaggerDocument = require('./docs/swagger.json');

const { NODE_ENV } = process.env;
const API_PORT = 4000;

const app = express();

const db = new DB();
db.testConnection();

app.use(cors());
app.use(helmet());
app.use(morgan(NODE_ENV === ENVIRONMENT.production ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/v1', v1);

app.use(notFound);
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(API_PORT, () => console.log(`Server started on port ${API_PORT}`));
