const express = require("express"); 
const movie = require("../model/MovieSchema");
const router = express.Router();
require("../conn");
router.get("/", (req, res) => {
  res.send("hello world from routerjs");
});

router.post("/create", async (req, res) => {
  const { id, Mname, imgLink, Summary } = req.body;
  console.log(id);
  if (!id || !Mname || !imgLink || !Summary) {
    return res.status(422).json({ error: "plz fill all the required details" });
  }
  try {
    const MovieExist = await movie.findOne({Mname: Mname});
    if (MovieExist) {
      return res.status(422).json({ error: "Movie already exist" });
    }

    const Movie = new movie({ id,Mname, imgLink, Summary });
    const MovieRegister = await Movie.save();
    if (MovieRegister) {
      console.log("MOVIE ADDED SUCCESSFULLY");
      return res
        .status(201)
        .json({ message: "MOVIE ADDED SUCCESSFULLY" });
    } else {
      console.log("MOVIE ADDED UNSUCCESSFULLY");
      res.status(500).json({ error: "Movie addition not succesfull" });
    }
  }
  catch (err) {

  }
});

router.delete("/delete", async (req, res) => {

  try {

    const Mname = req.body.Mname;
    console.log(Mname);
    const deletedMovie = await movie.deleteOne({Mname: Mname});
    console.log(deletedMovie);
    if (deletedMovie.deletedCount === 1) {

      return res
        .status(200)
        .json({ message: "Movie deleted Succesfully" });
    }
    else {

      return res
        .status(400)
        .json({ message: "Movie Not Found" });
    }

  }
  catch (err) {
    console.log(err);
  }

});

router.get("/read", async (req, res) => {
  console.log(req.body)
  var Movie="";
  const movies = await movie.find({});
  for (let i = 0; i < movies.length; i++)
  {
   if (req.body.id==movies[i].id) {
     Movie=movies[i]
   }
    
  }

  if (Movie=="") {
   res.send(movies)
  }else
  {
    res.send(Movie)
  }
  console.log("Mname")
});


router.put("/update", async (req, res) => {
  try {
    const {id, Mname, imgLink, Summary } = req.body;
    const result = await movie.findOneAndUpdate({id:id,  Mname: Mname , imgLink: imgLink, Summary: Summary })
    console.log(result)
    if (result) {
      return res.status(200).json({ message: "updation successfully" });
    }
    else {
      return res.status(400).json({ message: "Movie not found" });
    }

  }
  catch (err) {

  }
})


module.exports = router;
