# Smile

Smile is an Instagram-like social network. You have the same basic features, like uploading photos and videos, following people, liking and commenting their posts. But what sets us apart is the ad-free experience. Smile is the perfect choice if you want a private and ad-free environment where you can share unforgettable moments with other people.

## 1. How is it built
* [The back-end](./REST-API) portion uses **Express**, **mongoose**, **argon2** for password hashing, **jsonwebtoken (JWT)** for encoding user data stored in cookies and **MongoDB**.
* [The front-end](./smile) portion uses **React**.

## 2. Functionality
* Unauthorized users are only allowed to login or register.
* Authorized users can upload photos and videos, edit their profile, follow other people, like and comment posts.
