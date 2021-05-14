/* jshint esversion: 8 */
import mongoose from "mongoose";

mongoose.set("useNewUrlParser", true); // use the new MongoDB driver connection string parser
mongoose.set("useCreateIndex", true);  // use the MongoDB driver createIndex() function instead of ensureIndex()
mongoose.set("useUnifiedTopology", true); // use the new MongoDB topology engine
mongoose.set("useFindAndModify", false); // use the MongoDB driver findOneAndUpdate() instead of findAndModify()

/*
* MongoDB server configuration
*/


if (process.env.NODE_ENV === "test") {
    mongoose.connect('mongodb://127.0.0.1:27017/blog-testDB', { useNewUrlParser: true }, function (err) {
        if (err) return console.error(err);
        console.log('*****************');
        console.log('connection successed to mongoDb >>> blog-testDB');
    });
} else {
    mongoose.connect('mongodb://127.0.0.1:27017/blog', { useNewUrlParser: true }, function (err) {
        if (err) return console.error(err);
        console.log('*****************');
        console.log('connection successed to mongoDb >>> blog');
    });
}


export default mongoose;




