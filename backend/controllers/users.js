const http2 = require('http2');
const bcrypt = require('bcryptjs');
const NotFoundError = require('../errors/NotFoundError');
const User = require('../models/users');
const { generateToken } = require('../helpers/jwt');

const {
  HTTP_STATUS_OK, // 200
  HTTP_STATUS_CREATED, // 201
} = http2.constants;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ users });
    })
    .catch(next);
};

const findUser = (req, res, _id, next) => {
  User.findById(({ _id }))
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Пользователь не найден' });
      }
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const _id = req.params.userId;
  findUser(req, res, _id, next);
};

const getCurrentUser = (req, res, next) => {
  const _id = req.user.id;
  findUser(req, res, _id, next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(HTTP_STATUS_CREATED).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      });
    })
    .catch(next);
};

const updateData = (req, res, data, next) => {
  User.findByIdAndUpdate(req.user.id, data, { new: true, runValidators: true })
    .then((user) => {
      res.send({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        about: user.about,
      });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  updateData(req, res, { name, about }, next);
};

const updateAvatar = (req, res, next) => {
  const avatar = req.body;
  updateData(req, res, avatar, next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ email: user.email, type: 'admin', id: user._id });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
