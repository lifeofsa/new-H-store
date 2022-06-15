import jwt from 'jsonwebtoken';

const webToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default webToken;
