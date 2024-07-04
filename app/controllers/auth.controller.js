import bcrypt from 'bcrypt';
import { z } from 'zod';
import { User } from '../models/index.models.js';

export default {

  //-------REGISTER---------------------------------------------------
  
  async registerUser(req, res) {

    const userSchema = z.object({
      
      first_name: z.string().min(1).max(50),
      last_name: z.string().min(1).max(50),
      birth_date: z.date(),
      address: z.string().min(1).max(255),
      email: z.string().email().nonempty(),
      password: z.string().min(8).max(100).nonempty(),
      password_confirmation: z.string().min(8).max(100).nonempty(),
      about: z.string().optional().max(500),
      profil_picture: z.string().optional().url(),

    });

    try {

      const validatedData = userSchema.parse(req.body);

      if (password !== password_confirmation) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      const user = User.create({ ...validatedData, password: hashedPassword });
      
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
//-------LOGIN----------------------------------------------------

  async loginUser(req, res) {

    const loginSchema = z.object({
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    });

    try {

      const validatedData = loginSchema.parse(req.body);

      const user = await User.findOne({ where: { email: validatedData.email } });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
