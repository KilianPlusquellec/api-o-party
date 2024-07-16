import bcrypt from 'bcrypt';
import { User } from '../models/index.model.js';
import { updateSchema } from '../schemas/user.schema.js';

 //------ACCEDER A SON PROFIL----------------------------------------------------//

export default {
  async getMyUser(req, res) {

    try {
      const user = await User.findByPk(req.user.id, {
        include: [{
          association: 'events',
          include: [{
            association: 'host',
            attributes: { exclude: ['password', 'password_confirmation'] }
          }],
        }],
      });
        
      res.status(200).json(user);
          
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized'});
    }
  },

  //------TROUVER UN UTILISATEUR----------------------------------------------------//
  async getUser(req, res) {
    
    try {
    
      const user = await User.findByPk(req.params.id, {
        include: [{
          association: 'events',
          include: [{
            association: 'host',
            attributes: { exclude: ['password', 'password_confirmation'] }
          }],
        }],
      });
    
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
    
      res.status(200).json(user);

    } catch (error) {
      res.status(400).json({ error : 'error' });
    }
  },
 //------MODIFIER SON PROFIL----------------------------------------------------//

  async updateUser(req, res) {
    
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
      
      const validatedData = updateSchema.parse(updatedUser); 
    
      const user = await User.findByPk(req.user.id);
    

      await user.update(validatedData);
    
      res.status(200).json(user);
    
    } catch (error) {
      res.status(401).json({  error: 'Unauthorized' });
    }
  },
  
 //------SUPPRIMER SON COMPTE----------------------------------------------------//

  async deleteMyUser(req, res) {
      
    try {
      
      const user = await User.findByPk(req.user.id);
      
      await user.destroy();
      
      res.status(204).end();
      
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
};

