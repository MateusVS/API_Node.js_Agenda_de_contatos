const { body, validationResult } = require('express-validator');

const SessionValidator = () => [
  body('email')
    .notEmpty()
    .withMessage('O campo e-mail, nao pode ser vazio')
    .isEmail()
    .withMessage('O e-mail informado é inválido'),
  body('password')
    .notEmpty()
    .withMessage('O campo senha nao pode ser vazio')
    .isLength({ min: 8, max: 16 })
    .withMessage('O campo senha deve possuir de 8 a 16 caracteres'),
];

const validate = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  error.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    error: extractedErrors,
  });
};

module.exports = {
  SessionValidator,
  validate,
};
