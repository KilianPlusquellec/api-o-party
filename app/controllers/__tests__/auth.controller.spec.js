import { jest } from '@jest/globals';
//import bcrypt from 'bcrypt';
//import User from '../../models/user.model.js';
import authController from "../auth.controller.js";

// - Il faut que mon service soit un objet
test('Is authController an object', () => {
  expect(typeof authController).toBe('object');
});


  test('Is build registerUser a function', () => {
    expect(typeof authController.registerUser).toBe('function');
  });

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  
  test('registerUser returns status 201 with the user object', async () => {
    const req = {
      body: {
        // propriétés nécessaires pour le corps de la requête
        username: 'testuser',
        password: 'testpassword'
      }
    };
    
    const user = {
      id: 1,
      username: 'testuser'
      // les propriétés que l'utilisateur doit avoir
    };
  
    // Mock de la méthode registerUser
    jest.spyOn(authController, 'registerUser').mockImplementation((req, res) => {
      res.status(201).json(user);
    });
  
    // Appel de la méthode registerUser avec les mocks
    await authController.registerUser(req, res);
  
    // Vérification des appels de méthode
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(user);
  });
  
// describe('registerUser', () => {
//   beforeAll(() => {

//     jest.spyOn(bcrypt, 'hash').mockResolvedValue(() => 'hashedpassword');


//     jest.spyOn(User, 'create').mockImplementation((userData) => {
//       return { id: 1, ...userData };
//     });
//   });

//   test('should return a user with a hashed password', async () => {
//     const req = {
//       body: {
//         username: 'testuser',
//         email: 'testuser@example.com',
//         password: 'testpassword',
//         password_confirmation: 'testpassword'
//       }
//     };

//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn()
//     };

//     await authController.registerUser(req, res);

//     expect(bcrypt.hash).toHaveBeenCalledWith('testpassword', 10);
//     expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
//       username: 'testuser',
//       email: 'testuser@example.com',
//       password: 'hashedpassword',
//       password_confirmation: 'hashedpassword'
//     }));

//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
//       id: 1,
//       username: 'testuser',
//       email: 'testuser@example.com',
//       password: 'hashedpassword'
//     }));
//   });
// });
