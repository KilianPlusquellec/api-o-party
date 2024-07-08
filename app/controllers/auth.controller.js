import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models/index.model.js';

export default {

  //-------REGISTER---------------------------------------------------
  
  async registerUser(req, res) {

    const userSchema = z.object({
      
      first_name: z.string().min(1).max(50),
      last_name: z.string().min(1).max(50),
      //birth_date: z.date(),
      birth_date: z.string().transform((value) => new Date(value)).refine(date => !isNaN(date.valueOf()), {
        message: "Invalid date format",
      }),
      address: z.string().min(1).max(255),
      email: z.string().email().nonempty(),
      password: z.string().min(8).max(100).nonempty(),
      password_confirmation: z.string().min(8).max(100).nonempty(),
      about: z.string().max(500).optional(),
      profil_picture: z.string().url().optional(),

    });

    try {
      const {
        password,
        password_confirmation,
        ...validatedData
      } = userSchema.parse(req.body);
  
      if (password !== password_confirmation) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = User.create({  ...validatedData, password: hashedPassword, password_confirmation: hashedPassword });
      
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        details: error.details
      }  });
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

        // Générer un token pour l'utilisateur connecté
      const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });

      // Renvoyer le token dans la réponse
      res.status(200).json({ user, token });

      //res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
