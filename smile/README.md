# Smile

## Routes

| Route             | Description                                            |
| ----------------- | ------------------------------------------------------ |
| /                 | This is the home page which contains your feed         |
| /login            | Login page                                             |
| /register         | Register page                                          |
| /user/(username)  | User's profile page which contains their posts         |
| /settings | The settings page allows you to edit your profile info |
| /add-post         | Allows you to upload photos and videos                 |
| /change-password  | Change Password Page                                   |
| any other route   | Error Page                                             |

## Requirements

- You need to setup **Google ReCAPTCHA v2** or you can the use following site key **(for testing purposes only)** **`6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`**
- You need to setup **Sentry.io** for Next.js

## Project set up and running

- After cloning the repo, run **`npm install`**
- Setup Sentry.io - [learn more](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- Create a **.env** file
- Set the following variables:

  | Variable             | Value                     |
  | -------------------- | ------------------------- |
  | API_URL              | REST API URL              |
  | NEXT_PUBLIC_SITE_KEY | Google reCaptcha Site Key |
  | SENTRY_DSN           | Sentry DSN Link           |

- Run **`npm run dev`**

### The app runs on **`localhost:3000`**
