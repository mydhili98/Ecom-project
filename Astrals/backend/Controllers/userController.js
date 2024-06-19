const Users = require('../Models/users');
const Order = require('../Models/orders')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




const getUsers = async (req, res, next) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const signUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const existingUser = await Users.findOne({
      $or: [{ userName }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with the same username or email already exists',
      });
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    const newUser = new Users({
      userName,
      email,
      password: hash,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.send('Incorrect Password or Email');
    }
    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      return res.send('Incorrect Password or Email');
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_TOKEN
    );
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: true,
    });
    const currentUser = {
      userName: user.userName,
      profilePicture: user.profilePicture,
      email: user.email,
      admin: user.isAdmin,
      _id: user._id,
    };

    res.status(201).json({ currentUser });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};


const googleAuth = async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
    
        if (user) {
          const token = jwt.sign(
            { id: user._id, userName: user.userName },
            process.env.JWT_TOKEN
          );
          const { password: hashedPassword, ...rest } = user._doc;
          const expiryDate = new Date(Date.now() + 3600000);
          res
            .cookie("token", token, {
              withCredentials: true,
              httpOnly: true,
              expires: expiryDate,
            })
            .status(201)
            .json(rest);
        } else {
          const autoPassword =
            Math.random().toString(36).slice(-8) +
            Math.random().toString(36).slice(-8);
    
          const saltRounds = 10;
          const hashedPassword = bcrypt.hashSync(autoPassword, saltRounds);
    
          const newUser = new Users({
            userName:
              req.body.userName.split(' ').join('').toLowerCase() +
              Math.random().toString(36).slice(-8),
            email: req.body.email,
            password: hashedPassword,
            profilePicture: req.body.profilePicture,
          });
          await newUser.save();
    
          const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN);
          const { password: hashedPassword2, ...rest } = newUser._doc;
          const expiryDate = new Date(Date.now() + 3600000);
          res
            .cookie("token", token, {
              withCredentials: true,
              httpOnly: true,
              expires: expiryDate,
            })
            .status(201)
            .json(rest);
        }
      } catch (error) {
        res.status(500).send("Error Occured");
      }
};

const logout = async (req, res, next) => {
  try {
    res.cookie('token', '', { expires: new Date(0) });
    res.status(204).send('Logout successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.userId);


    await Users.findByIdAndDelete(user);
    await Order.deleteMany({ user: req.params.userId })

    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { username, password } = req.body;
  console.log(req.file)

  try {
    if (username) {
      await Users.findByIdAndUpdate(userId, { username });
      res.json({ message: 'Username updated successfully' });
    }

    if(password) {
      await Users.findByIdAndUpdate(userId, { password });
      res.json({ message: 'Password updated successfully' });
    }

    if (req.file) {
      console.log(req.file)
     const user = await Users.findByIdAndUpdate(userId, { profilePicture: req.file.path });
      res.json(user);
    }
    if (!username && !password && !req.file) {
      res.status(400).json({ error: 'No valid update provided' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getUsers,
  signUp,
  login,
  googleAuth,
  logout,
  deleteUser,
  updateProfile
};