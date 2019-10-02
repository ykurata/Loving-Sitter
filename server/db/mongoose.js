import mongoose from "mongoose/browser";
import beautifyUnique from "mongoose-beautiful-unique-validation";
import config from "./../config";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.set("debug", true);

mongoose.plugin(beautifyUnique);

module.exports = mongoose.connect(config.mongodb.uri).then(() => console.log("Connected to mongoDB..."));