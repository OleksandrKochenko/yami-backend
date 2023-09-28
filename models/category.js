const { Schema, model } = require("mongoose");
const handleMongooseError = require("../middlewares/handleMongooseError");

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

categorySchema.post("save", handleMongooseError); // fires on request error (invalid data of request)

const Category = model("category", categorySchema);

module.exports = Category;
