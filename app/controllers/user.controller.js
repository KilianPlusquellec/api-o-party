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
    
      const user = await User.findByPk(req.user.id);
    
      if (req.body.password !== req.body.password_confirmation) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

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