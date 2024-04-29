import express, { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

const router = express.Router();

// Get current user
router.get('/current-user', (req: Request, res: Response) => {
  if (req.session && req.session.user) {
    return res.json({ username: req.session.user.username });
  }
  res.status(404).json({ error: "No user logged in" });
});

// Signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password || username.trim() === '' || password.trim() === '') {
    return res.status(400).json({ 'error': 'Invalid username or password'});
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ error: "Username exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: username,
    password: hashedPassword,
    words: [],
    time: [],
  });
  await newUser.save();

  if (req.session) {
    req.session.user = { username: newUser.username };
  }

  res.status(200).json({ message: "User created successfully!" });

});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password || username.trim() === '' || password.trim() === '') {
      return res.status(400).json({ error: 'Username and password required'});
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(404).json({ error: "Invalid password." });
    }

    if (req.session) {
      req.session.user = {username: user.username};
    }

    res.status(200).json({ message: "Login Successful" });

});

// Logout
router.post('/logout', (req, res) => {
  req.session = null;
  res.status(200).json({ error: "Logout successful." });
});

// Save results
router.post('/save', async (req, res) => {
  try {
    const { wpm, mistakes } = req.body;

    console.log(wpm);
    console.log(mistakes);

    const currentUser = req.session?.user;

    if (!currentUser) {
      return res.status(403).json({ error: "User not authenticated" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: currentUser.username },
      { $push: { wpm: wpm, mistakes: mistakes } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "WPM and mistakes saved successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving WPM and mistakes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
