# REST-API

## 1. Project set up
* Run **npm install** (make sure you install the dev dependencies as well)
* Create a **_.env_** file which contains the following variables:

    | Variable             | Value                |
    |----------------------|----------------------|
    | DB_URL               | Database URL         |
    | SECRET               | CookieParser secret  |
    | JWT_KEY              | JWT secret key       |
    | RECAPTCHA_SERVER_KEY | reCAPTCHA SERVER KEY |
    | PORT                 | Port for REST API    |
    | APP_URL              | React App URL        |
    | CLOUD_NAME           | Cloudinary Cloud Name|
    | API_KEY              | Cloudinary API Key   |
    | API_SECRET           | Cloudinary API Secret|

## 2. Start the REST API
* Run **node(mon) -r dotenv/config index.js**
