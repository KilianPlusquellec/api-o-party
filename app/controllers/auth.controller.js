import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.model.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';

export default {

  //-------REGISTER---------------------------------------------------
  
  async registerUser(req, res) {

    try {
      const {
        password,
        password_confirmation,
        ...validatedData
      } = registerSchema.parse(req.body);
  
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
      res.status(200).header('Authorization', `Bearer ${token}`).json(user);

      //res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
};
