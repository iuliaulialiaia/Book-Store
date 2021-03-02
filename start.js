const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const {routes} = require('./routes');

const app = express();

// seteaza headere HTTP pentru securizarea aplicatiei Express
app.use(helmet());
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'));
// daca header-ul Content-Type este `json`,
// atunci obiectul `body` contine datele parsate 
app.use(express.json());
// daca header-ul Content-Type este `x-www-form-urlencoded`
// atunci obiectul `body` contine datele parsate
app.use(express.urlencoded({extended: false}));

app.use('/', routes);

// handler de erori declarat ca middleware
app.use(
	(err, req, res, next) => {
		console.trace(err);
		let status = 500;
		let message = 'Something Bad Happened';
		if (err.httpStatus) {
			status = err.httpStatus;
			message = err.message;
		}
		res.status(status).json({error:message});
	}
);

app.listen(3000,
	() => {
		console.log(`App is listening on 3000`);
	}
);