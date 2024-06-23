const fs = require('fs');
const movieModel  = require('./model/movie_model');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv'); 
dotenv.config({ path: "./config.env" });



const movies = JSON.parse(fs.readFileSync('./data/movie-data.json', 'utf-8', () => {
    console.log('file read succuessfully');
}));

mongoose.connect(process.env.CONN_STRING
).then((conn) => {
    console.log("DB CONNECION SUCCESS");
  })
  .catch((error) => {
    console.log("something went wrong :", error);
  });

const deleteDataBase = async () => {
   try {
    const movies = await movieModel.deleteMany();
    console.log('Movies deleted', movies);
   } catch(error) {
    console.log(error.message)
   }
   process.exit()
}
const insertMovies = async () => {
    try {
         await movieModel.insertMany(movies);
        console.log('Movies added', movies);
       } catch(error) {
        console.log(error.message)
       }
       process.exit()
}
if(process.argv[2] == '--delete') {
    deleteDataBase();
}
if(process.argv[2] == '--import') {
    insertMovies();
}
