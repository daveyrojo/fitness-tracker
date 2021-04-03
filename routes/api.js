const router = require("express").Router();
const Workout = require("../models/Workout.js");

// router is creating a workout via the body and then sending it to the database Workout
router.post("/api/workouts", ({ body }, res) => {
    console.log("API POST WORKOUTS: " + {body});
    Workout.create(body)
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

// get workouts by id
router.put("/api/workouts/:id", (req, res) => {
    // console.log("API PUT BY ID (REQ): " + req.type);
    // console.log("API PUT BY ID (RES): " + res);
    Workout.findByIdAndUpdate(
        req.params.id,
        {exercises: req.body},
        )
    .then((dbWorkout) => {
        console.log(dbWorkout);
        return res.json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

// aggragate for duration and duration range => look up .aggregate from mongoose 
router.get("/api/workouts", (req, res) => {
    console.log("API GET WORKOUTS: " + res.exercises);
    Workout
    .aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).jso(err);
    });
})



//routeris accessting api/workouts, then obtaining the body of all workouts but only selecting the workout based on the id to delete 
router.delete("/api/workouts/", ({ body }, res) => {
    console.log("API DELETE WORKOUT: " + body);
    Workout.findByIdAndDelete(body.id)
    .then(() => {
        return res.json(true);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

module.exports = router;