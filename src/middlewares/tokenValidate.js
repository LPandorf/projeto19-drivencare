import jwt from 'jsonwebtoken';
import { isDoctor, isPatient } from '../repositories/tokenValidateRepositories.js';

export const tokenValidate = async (req, res, next) => {
  const { authorization } = req.headers;
  const secretKey = process.env.SECRET_KEY;
  const token = authorization?.split(' ')[1]?.trim();
  if (!token) {
    return res.status(401).send('Faça login para continuar');
  }
  try {
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;
    
    
    const doc=await isDoctor(userId);
    const pat=await isPatient(userId);
    
    if(pat.rowCount===0) {
      res.locals.category="d";
    }

    if(doc.rowCount===0) {
      res.locals.category="p";
    }
    
    res.locals.userId= userId;
    
    next();
  } catch (error) {
    return res.status(401).send('Faça login para continuar');
  }
};