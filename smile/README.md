# Smile

## Routes

| Route            | Description                                            |
| ---------------- | ------------------------------------------------------ |
| /                | This is the home page which contains your feed         |
| /login           | Login page                                             |
| /register        | Register page                                          |
| /user/(username) | User's profile page which contains their posts         |
| /account/settings| The settings page allows you to edit your profile info |
| /post/add        | Allows you to upload photos and videos                 |
| /change-password | Change Password Page                                   |
| any other route  | Error Page                                             |

## Project set up and running
* After cloning the repo, run **`npm install`**
* Create a **.env** file
* Set the following variables:

    | Variable             | Value                     |
    |----------------------|---------------------------|
    | REACT_APP_API_URL    | REST API URL              |
    | REACT_APP_SITE_KEY   | Google reCaptcha Site Key |

* Run **`npm run start`**

### The app runs on **`localhost:3000`**
