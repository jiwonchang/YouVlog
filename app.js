var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/youvlog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");

// creating a vlog schema with mongoose
var vlogSchema = mongoose.Schema({
    title: String,
    video: String,
    content: String,
    created: {type: Date, default: Date.now}
});

// creating a vlog model using the vlog schema we created above
var Vlog = mongoose.model("Vlog", vlogSchema);

// for demonstration purposes, making a vlog entry
// Vlog.create({
//     title: "Minecraft BGMS are So Soothing",
//     video: "https://www.youtube.com/watch?v=bIOiV4d1SVI",
//     content: "Minecraft's background music is awesome. It evokes a certain... longing for something unknown. Perhaps they aimed to create a longing to known the unknown."
// });

// Vlog.create({
//     title: "Hatsune Miku LOL",
//     video: "https://www.youtube.com/watch?v=KMHXgUr7gYM",
//     content: "Apparently Japan's first vocaloid."
// });

// HOME PAGE
app.get("/", function(req, res) {
    res.send("THIS IS THE HOME PAGE");
});

// INDEX ROUTE
app.get("/entries", function(req, res) {
    Vlog.find({}, function(err, foundEntries) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {entries: foundEntries});
        }
    });
});

// NEW ROUTE
app.get("/entries/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/entries", function(req, res) {
    Vlog.create(req.body.entry, function(err, createdEntry) {
        if (err) {
            console.log(err);
        } else {
            console.log(createdEntry);
            res.redirect("/entries");
        }
    });
});

// SHOW ROUTE
app.get("/entries/:id", function(req, res) {
    Vlog.findById(req.params.id, function(err, foundEntry) {
        if (err) {
            res.redirect("/entries");
        } else {
            res.render("show", {entry: foundEntry});
        }
    });
});

// EDIT ROUTE
app.get("/entries/:id/edit", function(req, res) {
    res.send("THIS IS THE EDIT PAGE");
});

// UPDATE ROUTE
app.put("/entries/:id", function(req, res) {
    res.send("THIS IS THE UPDATE PAGE");
});

// DESTROY ROUTE
app.delete("/entries", function(req, res) {
    res.send("THIS IS THE DELETE PAGE");
});




app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YouVlog Server Has Launched!");
});