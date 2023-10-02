const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../middlewares");

const recipeSchema = Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    area: String,
    instructions: { type: String, required: true },
    description: String,
    thumb: String,
    preview: String,
    time: { type: String, required: true },
    youtube: String,
    tags: [],
    ingredients: { type: [], required: true },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post("save", handleMongooseError); // fires on request error (invalid data of request)

const Recipe = model("recipes", recipeSchema);

module.exports = Recipe;
