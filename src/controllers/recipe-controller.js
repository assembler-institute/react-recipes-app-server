const db = require("../models");

async function getRecipes(req, res, next) {
  try {
    const recipes = await db.Recipe.find({})
      .sort({ _id: -1 })
      .limit(10)
      .select(
        "_id name description difficulty image serves hoursToPrep minutesToPrep votes",
      )
      .lean()
      .exec();

    res.status(200).send({
      data: recipes,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function getRecipe(req, res, next) {
  try {
    const recipeID = req.params.recipeID;

    const recipe = await db.Recipe.findById(recipeID)
      .populate("author", "_id name lastname")
      .populate({
        path: "comments",
        select: "-__v -id -createdAt -updatedAt",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "author",
          select: "_id name lastname",
        },
      })
      .select("-__v")
      .lean()
      .exec();

    if (!recipe) {
      return res.status(404).send({
        data: null,
        error: "Recipe not found",
      });
    }

    res.status(200).send({
      data: recipe,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function addRecipeComment(req, res, next) {
  const { commentBody } = req.body;
  const { recipeID } = req.params;
  const { user } = req;

  try {
    if (!commentBody) {
      return res.status(400).send({
        data: null,
        error: "Missing fields",
      });
    }

    const recipe = await db.Recipe.findById(recipeID);

    if (!recipe) {
      return res.status(404).send({
        data: null,
        error: "Recipe not found",
      });
    }

    const comment = await db.Comment.create({
      author: user._id,
      body: commentBody,
      recipe: recipeID,
    });

    recipe.comments.push(comment._id);

    await recipe.save();

    await comment
      .populate({
        path: "author",
        select: "name lastname",
      })
      .execPopulate();

    const {
      // eslint-disable-next-line no-unused-vars
      __v,
      // eslint-disable-next-line no-unused-vars
      id,
      // eslint-disable-next-line no-unused-vars
      createdAt,
      // eslint-disable-next-line no-unused-vars
      updatedAt,
      ...sanitizedComment
    } = comment.toObject();

    res.status(201).send({
      data: sanitizedComment,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteRecipeComment(req, res, next) {
  const { commentID, recipeID } = req.params;

  try {
    const deleteComment = db.Comment.findByIdAndDelete(commentID);

    const deleteRecipeComment = db.Recipe.findByIdAndUpdate(recipeID, {
      $pull: {
        comments: {
          $in: [commentID],
        },
      },
    });

    await Promise.all([
      deleteComment.catch(next),
      deleteRecipeComment.catch(next),
    ]);
  } catch (error) {
    next(error);
  }

  res.status(200).send({
    data: "Ok",
    error: null,
  });
}

async function upVoteRecipe(req, res, next) {
  const { recipeID } = req.params;

  try {
    const recipe = await db.Recipe.findOneAndUpdate(
      { _id: recipeID },
      {
        $inc: { "votes.upVotes": 1 },
      },
      {
        new: true,
        projection: {
          comments: 0,
          author: 0,
          __v: 0,
        },
      },
    );

    if (!recipe) {
      return res.status(404).send({
        data: null,
        error: "Recipe not found",
      });
    }

    res.status(200).send({
      data: recipe,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function downVoteRecipe(req, res, next) {
  const { recipeID } = req.params;

  try {
    const recipe = await db.Recipe.findOneAndUpdate(
      { _id: recipeID },
      {
        $inc: { "votes.downVotes": 1 },
      },
      {
        new: true,
        projection: {
          comments: 0,
          author: 0,
          __v: 0,
        },
      },
    );

    if (!recipe) {
      return res.status(404).send({
        data: null,
        error: "Recipe not found",
      });
    }

    res.status(200).send({
      data: recipe,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRecipes,
  getRecipe,
  addRecipeComment,
  deleteRecipeComment,
  upVoteRecipe,
  downVoteRecipe,
};
