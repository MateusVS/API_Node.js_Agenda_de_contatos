const { body, validationResult } = require('express-validator');

const contactValidation = () => [
  body('name')
    .notEmpty()
    .withMessage('O campo nome, nao pode ser vazio')
    .isLength({ min: 3, max: 25 })
    .withMessage('O campo nome deve possuir de 3 a 25 caracteres'),
  body('UserId')
    .notEmpty()
    .withMessage('O campo contato nao pode ser vazio')
    .isInt()
    .withMessage('O usuario a qual o contato se refere e invalido'),
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
  contactValidation,
  validate,
};
