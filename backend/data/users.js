import bcrypt from 'bcryptjs';
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Ali Ahmed',
    email: 'Ali@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Farah Ahmed',
    email: 'Farah@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];
export default users;
