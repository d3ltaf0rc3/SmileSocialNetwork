# REST-API

This is the REST API for Smile Social Network.

## 1. Requirements

- The REST API only works with a **MongoDB** database.
- You need to setup Google ReCAPTCHA v2 or you can use the following server key (for testing purposes only) **`6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`**
- You need to have a **Cloudinary** account (used for storing images and videos)

## 2. Project set up

- Clone the repository
- Navigate to the **`REST-API`** folder
- Run **npm install**
- Create a **_.env_** file which contains the following variables:

  | Variable             | Value                 |
  | -------------------- | --------------------- |
  | DB_URL               | MongoDB Database URL  |
  | JWT_KEY              | JWT secret key        |
  | RECAPTCHA_SERVER_KEY | reCAPTCHA SERVER KEY  |
  | PORT                 | Port for REST API     |
  | APP_URL              | URL of the Front-end  |
  | CLOUD_NAME           | Cloudinary Cloud Name |
  | API_KEY              | Cloudinary API Key    |
  | API_SECRET           | Cloudinary API Secret |
  | SENTRY_DSN           | Sentry.io DSN         |

## 3. Start the REST API

- Run **npm run dev** or **node(mon) -r dotenv/config index.js**
