const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../middlewares/");

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { versionKey: false, timestamps: true }
);

categorySchema.post("save", handleMongooseError); // fires on request error (invalid data of request)

const Category = model("category", categorySchema);

module.exports = Category;
