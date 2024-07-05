import { User } from '../models/index.models.js';

export default {
  async getMyUser(req, res) {

    try {
    
      const user = await User.findByPk(req.user.id);
    
      res.status(200).json(user);
    
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async getUser(req, res) {
    
    try {
    
      const user = await User.findByPk(req.params.id,);
    
      res.status(200).json(user);
    
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  async updateUser(req, res) {
    
    const userSchema = z.object({
      first_name: z.string().min(1).max(50),
      last_name: z.string().min(1).max(50),
      birth_date: z.date(),
      address: z.string().min(1).max(255),
      email: z.string().email().nonempty(),
      password: z.string().min(8).max(100).nonempty(),
      about: z.string().optional().max(500),
      profil_picture: z.string().optional().url(),
    });

    try {
    
      const validatedData = userSchema.parse(req.body);
    
      const user = await User.findByPk(req.user.id);
    
      await user.update(validatedData);
    
      res.status(200).json(user);
    
    } catch (error) {
      res.status(400).json({ error });
    }
  },

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