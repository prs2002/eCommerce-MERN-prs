import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('prs2002', 10),
    isAdmin: true,
  },
  {
    name: 'prs',
    email: 'prs@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'jp ',
    email: 'jp@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'cj',
    email: 'cj@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

export default users;