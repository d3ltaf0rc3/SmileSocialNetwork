# REST-API

## 1. Project set up
* Run **npm install**
* Create a **_.env_** file which contains the following variables:
| Variable             | Value                |
| ---------------------|----------------------|
| DB_USER              | Database user        |
| DB_PASSWORD          | Database password    |
| SECRET               | CookieParser secret  |
| JWT_KEY              | JWT secret key       |
| RECAPTCHA_SERVER_KEY | reCAPTCHA SERVER KEY |
* Replace the DB URL located in [./config/database.js](./config/database.js)

## 2. Start the REST API
* Run **npm run start**
`NOTE! The API runs on port 7777`