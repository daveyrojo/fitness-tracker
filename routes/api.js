const router = require("express").Router();
const Workout = require("../models/workout.js");
const workout = require("../models/workout.js");

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
});

router.delete("/api/workouts/", ({ body}, res) => {
    Workout.findByIdAndDelete(body.id)
    .then(() => {
        return res.json(true);
    })
    .catch((err) => {
        res.status(400).json(err);
    })
});