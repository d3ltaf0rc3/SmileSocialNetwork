const User = require("../models/User");
const Session = require("../models/Session");
const jwt = require("jsonwebtoken");
const Sentry = require("@sentry/node");
const argon2 = require("argon2");
const cloudinary = require("cloudinary");
const sanitizeString = require("../utils/sanitizeString");
const deleteSensitiveData = require("../utils/deleteSensitiveData");
const { validationResult } = require("express-validator");
const response = require("../utils/responseGenerator");
const { DEFAULT_PICTURE } = require("../utils/constants");

async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(response("fail", errors.array()[0].msg));
  }

  const { username, password } = req.body;

  try {
    const hash = await argon2.hash(password);

    const user = new User({ username, password: hash });
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
    const session = new Session({
      token,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 604800000)
    });
    await session.save();
    await User.findByIdAndUpdate(user.id, { $addToSet: { sessions: session.id } });

    const userToSend = deleteSensitiveData(user);
    return res.status(201).send(response("success", { user: userToSend, token }));
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      return res.status(409).send(response("fail", "Username already taken!"));
    }
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(response("fail", errors.array()[0].msg));
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user === null) {
      return res.status(401).send(response("fail", "Wrong username or password!"));
    }

    const status = await argon2.verify(user.password, password);

    if (status) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_KEY);
      const session = new Session({
        token,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 604800000)
      });
      await session.save();
      await User.findByIdAndUpdate(user.id, { $addToSet: { sessions: session.id } });

      const userToSend = deleteSensitiveData(user);
      return res.send(response("success", { user: userToSend, token }));
    } else {
      return res.status(401).send(response("fail", "Wrong username or password!"));
    }
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function logout(req, res) {
  try {
    await User.findByIdAndUpdate(req.userId, { $pull: { sessions: req.sessionId } });
    await Session.findByIdAndDelete(req.sessionId);

    return res.send(response("success", "Logout is successful!"));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function editUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(response("fail", errors.array()[0].msg));
  }

  const { name, description, isPrivate } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.userId, {
      name,
      description,
      isPrivate
    }, { new: true });

    if (!user.isPrivate && user.requests.length > 0) {
      for (const userId of user.requests) {
        await User.findByIdAndUpdate(user.id, { $pull: { requests: userId }, $addToSet: { followers: userId } });
        await User.findByIdAndUpdate(userId, { $addToSet: { following: user.id } });
      }
    }

    const userToSend = deleteSensitiveData(user);
    return res.send(response("success", userToSend));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function getUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(response("fail", errors.array()[0].msg));
  }

  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (user === null) {
      return res.status(404).send(response("fail", "User not found!"));
    }

    let hasRequested = false;
    let doesFollow = false;
    if (req.userId !== user._id) {
      hasRequested = user.requests.includes(req.userId);
      doesFollow = user.followers.includes(req.userId);
    }

    const userToSend = deleteSensitiveData(user);
    return res.send(response("success", {
      ...userToSend,
      hasRequested,
      doesFollow,
      followers: user.followers.length,
      following: user.following.length,
      posts: user.posts.length
    }));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function changePassword(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(response("fail", errors.array()[0].msg));
  }

  const { oldPassword, password } = req.body;

  try {
    const user = await User.findById(req.userId);
    const result = await argon2.verify(user.password, oldPassword);

    if (result) {
      const hash = await argon2.hash(password);

      for (const session of user.sessions) {
        await Session.findByIdAndDelete(session);
      }
      await User.findByIdAndUpdate(req.userId, { password: hash, sessions: [] });
      return res.send(response("success", "Password successfully changed!"));
    }
    return res.status(400).send(response("fail", "Wrong current password!"));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function searchUsers(req, res) {
  const query = sanitizeString(req.query.query);

  if (query === "") {
    return res.send(response("success", []));
  }

  try {
    const users = await User.find({ username: { $regex: query, $options: "i" } })
      .limit(10)
      .select("username profilePicture");

    return res.send(response("success", users));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function handleAction(req, res) {
  const { id, action } = req.params;

  if (id === req.userId) {
    return res.status(400).send(response("fail", "Cannot perform the following action on yourself!"));
  } else if (action !== "unfollow" && action !== "follow" && action !== "cancel-request") {
    return res.status(400).send(response("fail", "Unsupported action!"));
  }

  try {
    const userToHandle = await User.findById(id);
    const loggedUser = await User.findById(req.userId);

    if (userToHandle === null) {
      return res.status(404).send(response("fail", "User not found!"));
    }

    if (action === "unfollow") {
      if (
        !loggedUser.following.includes(userToHandle._id) &&
        !userToHandle.followers.includes(loggedUser._id)
      ) {
        return res
          .status(405)
          .send(response("fail", "Cannot unfollow a user who you are not already following!"));
      }
      await User.findByIdAndUpdate(userToHandle._id, {
        $pull: { followers: req.userId },
      });
      await User.findByIdAndUpdate(loggedUser._id, {
        $pull: { following: userToHandle._id },
      });
    } else if (action === "follow") {
      if (
        loggedUser.following.includes(userToHandle._id) &&
        userToHandle.followers.includes(loggedUser._id)
      ) {
        return res
          .status(405)
          .send(response("fail", "Cannot follow a user who you are already following!"));
      } else if (userToHandle.isPrivate && userToHandle.requests.includes(loggedUser._id)) {
        return res
          .status(405)
          .send(response("fail", "You have already requested to follow this user!"));
      }

      if (userToHandle.isPrivate) {
        await User.findByIdAndUpdate(userToHandle._id, { $addToSet: { requests: req.userId } });
      } else {
        await User.findByIdAndUpdate(userToHandle._id, { $addToSet: { followers: req.userId } });
        await User.findByIdAndUpdate(req.userId, { $addToSet: { following: userToHandle._id } });
      }
    } else if (action === "cancel-request") {
      if (!userToHandle.requests.includes(loggedUser._id)) {
        return res
          .status(405)
          .send(response("fail", "Cannot cancel a request that you have not made!"));
      }
      await User.findByIdAndUpdate(userToHandle._id, { $pull: { requests: req.userId } });
    }

    return res.send(response("success", "Action completed successfully!"));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function handleRequest(req, res) {
  const { id, action } = req.params;

  if (id === req.userId) {
    return res.status(400).send(response("fail", "Cannot perform the following action on yourself!"));
  } else if (action !== "accept" && action !== "deny") {
    return res.status(400).send(response("fail", "Action not supported!"));
  }

  try {
    const userToHandle = await User.findById(id);
    const loggedUser = await User.findById(req.userId);

    if (userToHandle === null) {
      return res.status(404).send(response("fail", "User not found!"));
    } else if (!loggedUser.requests.includes(userToHandle._id)) {
      return res.status(405).send(response("fail", "Cannot handle a non-existing request!"));
    }

    await User.findByIdAndUpdate(req.userId, { $pull: { requests: userToHandle._id } });

    if (action === "accept") {
      await User.findByIdAndUpdate(userToHandle._id, {
        $addToSet: { following: req.userId },
      });
      await User.findByIdAndUpdate(req.userId, {
        $addToSet: { followers: userToHandle._id },
      });
    }
    return res.send(response("success", "Request handled successfully!"));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function getRequests(req, res) {
  try {
    const { requests } = await User.findById(req.userId).select("requests").populate({
      path: "requests",
      select: "username profilePicture",
    });

    return res.send(response("success", requests));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

async function changeProfilePicture(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(response("fail", errors.array()[0].msg));
  } else if (req.body.resource.startsWith(`https://res.cloudinary.com/${process.env.CLOUD_NAME}/video/upload`)) {
    return res.status(400).send(response("fail", "Profile picture cannot be a video file!"));
  }

  try {
    const { resource, public_id } = req.body;

    const user = await User.findById(req.userId);
    if (user.profilePicture !== DEFAULT_PICTURE) {
      await cloudinary.v2.uploader.destroy(user.public_id, { resource_type: "image" });
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, { profilePicture: resource, public_id }, { new: true });

    const userToSend = deleteSensitiveData(updatedUser);
    return res.send(response("success", userToSend));
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).send(response("fail", error.message));
  }
}

module.exports = {
  register,
  login,
  logout,
  editUser,
  changePassword,
  getUser,
  searchUsers,
  handleAction,
  handleRequest,
  getRequests,
  changeProfilePicture,
};
