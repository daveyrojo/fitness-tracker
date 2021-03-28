const router = require("express").Router();
const Workout = require("../models/Workout.js");

// router is creating a workout via the body and then sending it to the database Workout
router.post("/api/workouts", ({ body }, res) => {
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
    Workout.findByIdAndUpdate(
        req.params.id,
        {$push:{$exercises: req.body}}
        )
    .then((dbWorkout) => {
        return res.json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

// //or is it:
// router.get("api/workouts", ({ body }, res) => {
//   Workout.findById(body.id)
//     .then(() => {
//       return res.json(body);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });



// aggragate for duration and duration range => look up .aggregate from mongoose 
router.get("/api/workouts", (req, res) => {
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
    Workout.findByIdAndDelete(body.id)
    .then(() => {
        return res.json(true);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

module.exports = router;