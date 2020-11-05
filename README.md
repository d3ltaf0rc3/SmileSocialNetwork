# Smile

Smile is an Instagram-like social network. You have the same basic features, like uploading photos and videos, following people, liking and commenting their posts. But what sets us apart is the ad-free experience. Smile is the perfect choice if you want a private and ad-free environment where you can share unforgettable moments with other people.

You can try the app **[here](https://smile-social-network.netlify.app)**

## 1. How is it built
* [The back-end](./REST-API) portion uses **Express**, **mongoose**, **bcrypt** for password hashing, **jsonwebtoken (JWT)** for encoding user data stored in cookies and **MongoDB** for storage.
* [The front-end](./smile) portion uses **React**.

## 2. Functionality
* Unauthorized users are only allowed to login or register.
* Authorized users can upload photos and videos, change their profile picture and info, follow other people, like and comment posts.