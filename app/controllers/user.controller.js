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
        
      // Supprimer le mot de passe de l'objet user
      const userWithoutPassword = {
        ...user.toJSON(),
        password: undefined,
        password_confirmation: undefined
      };

      res.status(200).json(userWithoutPassword);
          
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
    
      // Supprimer le mot de passe de l'objet user
      const userWithoutPassword = {
        ...user.toJSON(),
        password: undefined,
        password_confirmation: undefined
      };

      res.status(200).json(userWithoutPassword);

    } catch (error) {
      res.status(400).json({ error : 'error' });
    }
  },
 //------MODIFIER SON PROFIL----------------------------------------------------//

  async updateUser(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Vérifier que les mdp saisis correspondent
      if (req.body.password && req.body.password !== req.body.password_confirmation) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
  
      // Si les mdp correspondent, on réencrypte le mdp 
      const encryptedPassword = req.body.password ? await bcrypt.hash(req.body.password, 10) : undefined;
  
      // Créer un objet seulement pour les champs modifiés
      const updatedFields = {};
      if (req.body.first_name && req.body.first_name !== user.first_name) updatedFields.first_name = req.body.first_name;
      if (req.body.last_name && req.body.last_name !== user.last_name) updatedFields.last_name = req.body.last_name;
      if (req.body.birth_date && req.body.birth_date !== user.birth_date) updatedFields.birth_date = req.body.birth_date;
      if (req.body.address && req.body.address !== user.address) updatedFields.address = req.body.address;
      if (req.body.email && req.body.email !== user.email) updatedFields.email = req.body.email;
      if (req.body.about && req.body.about !== user.about) updatedFields.about = req.body.about;
      if (req.body.profil_picture && req.body.profil_picture !== user.profil_picture) updatedFields.profil_picture = req.body.profil_picture;
      if (encryptedPassword) updatedFields.password = encryptedPassword;
  
      // Valider les données mises à jour
      const validatedData = updateSchema.parse(updatedFields);
  
      // Mettre à jour l'utilisateur
      await user.update(validatedData);
  
      res.status(200).json(validatedData);
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
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

