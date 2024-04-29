import express from 'express';
import User from '../models/user';

const router = express.Router();

// Get user data by username
router.get('/:username', async (req, res) => {
    try {
      const user = await User.findOne({username: req.params.username});
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error getting user" });
    }
  });
  
export default router;