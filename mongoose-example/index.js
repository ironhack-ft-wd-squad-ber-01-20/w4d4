const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost:27017/db-example", () => {
  console.log("Connected to the local db");
});

const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: Object
});

const Cat = mongoose.model("Cat", catSchema);

// Cat.create({ name: "Bar", hungry: true }).then(created => {
//   console.log(created);
// });

// Model.create([{},{},...])
/* Cat.create([
  {
    name: "Grumpy",
    age: 9
  },
  { name: "Garfield" }
]); */

/*
console.log(1);
Cat.create({ name: "Foo" })
  .then(result => {
    console.log(2);
    console.log(result);
  })
  .catch(err => {
    console.log("Error: ", err);
  });

console.log(3);
*/

/* // Cat.find({}) -> return all documents in the `cats` collection
Cat.find({ address: { streetName: "Sesame" } })
  .then(results => {
    // when using find(), the results will always be an array -> [] if no results
    console.log(results);
  })
  .catch(err => {
    console.log("Error: ", err);
  }); */

/* // Cat.findOne(query) -> returns the first document matching a given query in the `cats` collection
Cat.findOne({ hungry: true })
  // .sort({ age: 1 })
  // .exec()
  .then(foundCat => {
    // the result will be one document OR null if no document matched the query
    console.log(foundCat);
  });
 */

/* //  Cat.findById(id) -> returns the document with a _id field matching the given ObjectId
Cat.findById("5e32ec45e2a50a6c39e80f67").then(cat => {
  console.log(cat);
}); */

// setTimeout(() => {
//   console.log("Closing the connection");
//   mongoose.connection.close();
// }, 5000);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    maxlength: 16,
    required: true,
    set: str => str.toLowerCase(),
    validate: {
      validator: str => {
        if (/^[a-zA-Z0-9]*$/.test(str)) {
          return true;
        }
        return false;
      },
      message: "The username can only be composed of letters and numbers"
    }
  },
  website: {
    type: String,
    validate: {
      validator: str => {
        if (!str.startsWith("http") && !str.startsWith("www")) {
          return false;
        }
        return true;
      },
      message: "The website should start with http or www"
    }
  },
  password: {
    type: String,
    required: true
  },
  email: {
    trim: true,
    type: String
    // validator with regex
  },
  phoneNumbers: [Number],
  birthDate: Date,
  role: {
    type: String,
    enum: ["admin", "user", "mod"],
    default: "user"
  },
  isActive: Boolean,
  cats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cat" // this will create a reference to the model named `Cat` -> to the `cats` collection
    }
  ]
});

const User = mongoose.model("User", userSchema);

/* User.create({
  age: 17,
  username: "randomuser22",
  website: "www.foo.com",
  password: "123456",
  isActive: true
})
  .then(createdUser => {
    console.log(createdUser);
  })
  .catch(err => {
    console.log(err);
  }); */
