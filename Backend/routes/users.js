const User = require("../models/Users");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const validateToken = require("../middleware/verifyToken");
const imageUpload = require("../middleware/uploadimg");

//get all users
router.get("/all", validateToken, async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update user
router.put(
  "/:id",
  validateToken,
  imageUpload.single("image"),
  async (req, res) => {
    if (req.data.id === req.params.id || req.body.isAdmin) {
      if (req.body.gender && req.body.username) {
        if (req.body.password) {
          try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
          } catch (err) {
            return res.status(500).json(err);
          }
        }
        try {
          const user = await User.findByIdAndUpdate(req.params.id, {
            $set: { ...req.body },
          });
          res.status(200).json("Account has been updated");
        } catch (err) {
          return res.status(500).json(err);
        }
      } else {
        return res.status(403).json({
          message: "username and gender are mandatory",
        });
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  }
);

//delete user
router.delete("/:id", validateToken, async (req, res) => {
  if (req.data.id === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

// edit-profilepicture
router.put(
  "/edit-profile-picture/:id",
  validateToken,
  imageUpload.single("image"),
  async (req, res) => {
    // console.log(req.body);
    if (req.data.id === req.params.id || req.body.isAdmin) {
      const user = await User.findByIdAndUpdate(req.params.id);
      try {
        await user.updateOne({ $set: { profilePicture: req.file.filename } });
        res.status(200).json("Dp updated successfully");
      } catch (err) {
        console.log(err);
      }
    } else {
      return res.status(403).json("You can update only your dp!");
    }
  }
);

// delete-profilepicture
router.put("/delete-profile-picture/:id", validateToken, async (req, res) => {
  if (req.data.id === req.params.id || req.body.isAdmin) {
    const user = await User.findByIdAndUpdate(req.params.id);
    try {
      await user.updateOne({ $set: { profilePicture: "" } });
      res.status(200).json("Dp has been deleted successfully");
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(403).json("You can delete only your dp!");
  }
});

//get a user
router.get("/:id", validateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//change password
router.put("/changepassword/:id", validateToken, async (req, res) => {
  if (req.data.id === req.params.id || req.body.isAdmin) {
    if (req.body.previousPassword && req.body.newPassword) {
      const user = await User.findByIdAndUpdate(req.params.id);
      const salt = await bcrypt.genSalt(10);

      try {
        bcrypt.compare(
          req.body.previousPassword,
          user.password,
          async function (err, res1) {
            if (res1) {
              const newHashed = await bcrypt.hash(req.body.newPassword, salt);
              await user.updateOne({ $set: { password: newHashed } });
              res.status(200).json({
                user: user,
                message: "info updated successfully",
              });
            } else {
              // response is OutgoingMessage object that server response http request
              return res.status(403).json({
                success: false,
                message: "new and old password did not match",
              });
            }
          }
        );
      } catch (err) {
        return res.status(500).json({ success: false, message: err });
      }
    } else {
      //check if old and new password are provided from client
      let err = {};
      if (!req.body.previousPassword) {
        err.flag1 = true;
      }
      if (!req.body.newPassword) {
        err.flag2 = true;
      }

      return res.status(403).json({
        message: [
          err.flag1 && "please provide previous password",
          err.flag2 && "please provide new password",
        ],
      });
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//follow a user
router.put("/follow/:id", validateToken, async (req, res) => {
  if (req.data.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.data.id);
      if (!user.followers.includes(req.data.id)) {
        await user.updateOne({ $push: { followers: req.data.id } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user
router.put("/unfollow/:id", validateToken, async (req, res) => {
  if (req.data.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.data.id);
      if (user.followers.includes(req.data.id)) {
        await user.updateOne({ $pull: { followers: req.data.id } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

// code for timeline & individual posts of a user is in the post route

module.exports = router;
