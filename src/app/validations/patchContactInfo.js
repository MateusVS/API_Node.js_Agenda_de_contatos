const { body, validationResult } = require('express-validator');

const infoValidation = () => [
  body('type')
    .optional()
    .isInt()
    .withMessage('Tipo invalido'),
  body('ContactId')
    .optional()
    .isInt()
    .withMessage('O contato a qual a informacao se refere e invalido'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  infoValidation,
  validate,
};
