const Joi = require('joi')

const email = Joi.string().email().required().messages({
  'string.email': 'メールアドレスの形式が正しくありません',
  'string.empty': 'メールアドレスを入力してください',
  'any.required': 'メールアドレスは必須です',
});
const password = Joi.string().min(8).required().messages({
  'string.min': 'パスワードは8文字以上で入力してください',
  'string.empty': 'パスワードを入力してください',
  'any.required': 'パスワードは必須です',
});

module.exports.postSchema = Joi.object({
  content: Joi.string().trim().required().max(200).messages({
    'string.empty': '投稿内容を入力してください',
    'any.required': '投稿内容は必須です',
    'string.max': '200文字以内で入力してください',
  }),
});

module.exports.loginSchema = Joi.object({ email, password });

module.exports.registerSchema = Joi.object({ email, password });

module.exports.usernameSchema = Joi.object({
  username: Joi.string().trim().allow('').max(20).messages({
    'string.max': 'ユーザー名は20文字以内で入力してください',
  }),
});