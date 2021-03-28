const router = require("express").Router();
const Workout = require("../models/workout.js");
const workout = require("../models/workout.js");

router.post("/api/workout.js", ({ body }, res) => {
    Workout.create(body)
    .then((dbTransaction) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
})