const Joi = require('joi');
module.exports.postSchema = Joi.object({
    title: Joi.string().trim().required().messages({
        'string.empty': 'タイトルを入力してください',
        'any.required': 'タイトルは必須です',
    }),
    content: Joi.string().trim().required().max(200).messages({
        'string.empty': '投稿内容を入力してください',
        'any.required': '投稿内容は必須です',
        'string.max': '200文字以内で入力してください',
    }),
});

module.exports.userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'メールアドレスの形式が正しくありません',
    'string.empty': 'メールアドレスを入力してください',
    'any.required': 'メールアドレスは必須です',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'パスワードは8文字以上で入力してください',
    'string.empty': 'パスワードを入力してください',
    'any.required': 'パスワードは必須です',
  }),
});


