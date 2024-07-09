import bcrypt from 'bcrypt';
import { z } from 'zod';
import { User } from '../models/index.model.js';

 //------ACCEDER A SON PROFIL----------------------------------------------------//

export default {
  async getMyUser(req, res) {

    try {
    
      const user = await User.findByPk(req.user.id);
    
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.status(200).json(user);
          
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  //------TROUVER UN UTILISATEUR----------------------------------------------------//
  async getUser(req, res) {
    
    try {
    
      const user = await User.findByPk(req.params.id,);
    
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    
      res.status(200).json(user);

    } catch (error) {
      res.status(400).json({ error });
    }
  },
 //------MODIFIER SON PROFIL----------------------------------------------------//

  async updateUser(req, res) {
    
    const userSchema = z.object({
      first_name: z.string().min(1).max(50).optional(),
      last_name: z.string().min(1).max(50).optional(),
      birth_date: z.string().transform((value) => new Date(value)).refine(date => !isNaN(date.valueOf()), {
        message: "Invalid date format",
      }).optional(),
      address: z.string().min(1).max(255).optional(),
      email: z.string().email().optional(),
      password: z.string().min(8).max(100).optional(),
      password_confirmation: z.string().min(8).max(100).optional(),
      about: z.string().max(500).optional(),
      profil_picture: z.string().url().optional(),
    });

    try {
      // on vérifie que les mdp saisis correspondent
      if (req.body.password !== req.body.password_confirmation) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
      // si les mdp sont correspondent, on réencrypte le mdp
      const encryptedPassword = await bcrypt.hash(req.body.password, 10)
      //on déclare un nouvel objet pour mettre à jour l'utilisateur
      const updatedUser = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        birth_date : req.body.birth_date,
        address : req.body.address,
        email : req.body.email,
        password: encryptedPassword,
        about : req.body.about,
        profil_picture : req.body.profil_picture,
      };
      
      const validatedData = userSchema.parse(updatedUser); 
    
      const user = await User.findByPk(req.user.id);
    

      await user.update(validatedData);
    
      res.status(200).json(user);
    
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  
 //------SUPPRIMER SON COMPTE----------------------------------------------------//

  async deleteMyUser(req, res) {
      
    try {
      
      const user = await User.findByPk(req.user.id);
      
      await user.destroy();
      
      res.status(204).end();
      
    } catch (error) {
      res.status(400).json({ error });
    }
  }
};

