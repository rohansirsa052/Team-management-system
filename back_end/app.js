const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors"); 
require('dotenv').config();

app.use(cors());


  mongoose
  .connect(process.env.MONGODB_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));



  const userSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
      },
      last_name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      gender: {
        type: String,
        enum: ['Male', 'Female'] 
      },
      avatar: {
        type: String
      },
      domain: {
        type: String
      },
      available: {
        type: Boolean,
        default: true 
      }
    });

    const User = new mongoose.model("User", userSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post("/users", async (req, res) => {
    try {
      const {id, first_name, last_name, email, gender, domain, avatar, available  } = req.body;
  
      const newUser = User({
        id,
        first_name,
        last_name,
        email,
        gender,
        domain,
        avatar,
        available
      });
  
      const result = await newUser.save();
      res.status(201).json(result); 
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
  });

  app.get("/users", async (req, res) => {
    try {
      const result = await User.find({}); 
      res.json(result);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  app.get("/users/:first_name", async (req, res) => {
    try {
      const first_name = req.params.first_name;
      const result = await User.findOne({ first_name });
  
      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(result);
    } catch (err) {
      console.error("Error retrieving user:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  app.patch("/users/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedUser= await User.findOneAndUpdate({ id: id }, req.body, {
        new: true
      });
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found." });
      }
     console.log(updatedUser);
      res.json(updatedUser );
    } catch (err) {
        console.log(err);
      res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
  });

  app.delete("/users/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await User.findOneAndDelete({ id: id });
      if (result===null) {
        return res.status(404).json({ error: "User not found." });
      }
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Something went wrong. Please try again later." });
    
    }
  });

  
const port = process.env.PORT || 8070;
app.listen(port, () => console.log(`Server running at ${port}`));
