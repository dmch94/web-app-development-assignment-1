import Mongoose from "mongoose";

const { Schema } = Mongoose;

const runSchema = new Schema({
  title: String,
  distance: Number,
  duration: Number,
  locationid: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

export const Run = Mongoose.model("Run", runSchema);
