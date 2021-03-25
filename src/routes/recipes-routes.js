const passport = require("passport");
const { Router } = require("express");

const recipesRouter = Router();

const recipesController = require("../controllers/recipe-controller");

recipesRouter.get("/recipes", recipesController.getRecipes);

recipesRouter.get("/recipes/:recipeID", recipesController.getRecipe);

recipesRouter.post(
  "/recipes/:recipeID/comment",
  passport.authenticate("jwt", { session: false }),
  recipesController.addRecipeComment,
);

recipesRouter.delete(
  "/recipes/:recipeID/comments/:commentID",
  passport.authenticate("jwt", { session: false }),
  recipesController.deleteRecipeComment,
);

recipesRouter.patch(
  "/recipes/:recipeID/up-vote",
  passport.authenticate("jwt", { session: false }),
  recipesController.upVoteRecipe,
);

recipesRouter.patch(
  "/recipes/:recipeID/down-vote",
  passport.authenticate("jwt", { session: false }),
  recipesController.downVoteRecipe,
);

module.exports = recipesRouter;
