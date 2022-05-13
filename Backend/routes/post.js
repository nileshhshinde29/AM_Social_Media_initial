const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/Users");
const validateToken = require("../middleware/verifyToken");
const imageUpload = require("../middleware/uploadimg");
const paginatedResults = require("../middleware/pagination");

//get all posts
router.get("/", validateToken, paginatedResults(Post), async (req, res) => {
  const posts = res.paginatedResults;

  try {
    res.status(200).json({
      posts,
      message: "fetched all posts successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create post
router.post(
  "/create",
  validateToken,
  imageUpload.single("image"),
  async (req, res) => {
    try {
      if (!req.body.caption) {
        res.status(404).json({ message: "caption is mandatory" });
      } else {
        const newPost = new Post({
          caption: req.body.caption,
          img: req.file.filename,
          userId: req.data.id,
        });
        const savedPost = await newPost.save();
        res.status(200).json({
          post: savedPost,
          message: "Post created successfully",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//get a post
router.get("/:id", validateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post
router.put("/update/:id", validateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.data.id) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/delete/:id", validateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.data.id) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// like/dislike a post
router.put("/:id/like", validateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.data.id)) {
      await post.updateOne({ $push: { likes: req.data.id } });
      const post1 = await Post.findById(req.params.id);

      res.status(200).json({
        message: "The post has been liked ",
        likes: post1.likes.length,
      });
    } else {
      // for dislike
      await post.updateOne({ $pull: { likes: req.data.id } });
      const post1 = await Post.findById(req.params.id);
      res.status(200).json({
        message: "The post has been disliked",
        likes: post1.likes.length,
      });
    }
  } catch (err) {
    res.status(500).json(err, "invlid id");
  }
});

//comment on post
router.put("/:id/comment", validateToken, async (req, res) => {
  try {
    if (!req.body.comment || req.body.comment === "") {
      res.status(403).json({ message: "invalid comment" });
    } else {
      const post = await Post.findById(req.params.id);
      const user = await User.findById(req.data.id);
      await post.updateOne({
        $push: {
          comments: {
            user: user.firstname + " " + user.lastname,
            comment: req.body.comment,
            userId: req.data.id,
            likes: [],
          },
        },
      });

      res.status(200).json({
        // post: post,
        message: "Commented successfully",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// like/dislike a comment
router.put(
  "/:postId/like-dislike-comment/:commentId", // comment id is INDEX of the comment
  validateToken,
  async (req, res) => {
    const { postId, commentId } = req.params;
    try {
      const post = await Post.findById(postId);
      if (post.comments.length > commentId) {
        let flag = `Liked`;
        let arr = post.comments.map((item, ind) => {
          if (ind == commentId) {
            if (!item.likes.includes(req.data.id)) {
              item.likes.push(req.data.id);
            } else {
              item.likes = item.likes.filter((id) => id !== req.data.id);
              flag = "Disliked";
            }
            return item;
          }
          return item;
        });
        await post.updateOne({ $set: { comments: arr } });
        res.status(200).json({
          result: post.comments,
          message: "The comment has been " + flag,
        });
      } else {
        res.status(404).json({
          message:
            "invalid comment id, make sure you are sending comments INDEX in params",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// get a USERS timeline posts
router.get("/timeline/:id", validateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userPosts = await Post.find({ userId: req.params.id });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json({ err, message: "invalid id" });
  }
});

//get user's all posts
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const posts = await Post.find({ userId: req.params.id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ err, message: "invalid id" });
  }
});

module.exports = router;
