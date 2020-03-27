const { body, validationResult } = require('express-validator');

const userValidation = () => [
  body('name')
    .notEmpty()
    .withMessage('O campo nome, nao pode ser vazio')
    .isLength({ min: 3, max: 20 })
    .withMessage('O campo nome deve possuir de 3 a 20 caracteres'),
  body('email')
    .notEmpty()
    .withMessage('O campo email, nao pode ser vazio')
    .isEmail()
    .withMessage('Seu e-mail é inválido'),
  body('password')
    .notEmpty()
    .withMessage('O campo senha, nao pode ser vazio')
    .isLength({ min: 8, max: 16 })
    .withMessage('O campo senha deve possuir de 8 a 16 caracteres'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extratectedErrors = [];
  errors.array().map((err) => extratectedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extratectedErrors,
  });
};

module.exports = {
  userValidation,
  validate,
};
