export const formData = [
  {
    key: 1,
    type: "text",
    name: "username",
    registerConfig: {
      required: "Поле 'Имя пользователя' обязательно к заполнению.",
      minLength: {
        value: 5,
        message: "Имя пользователя не может быть короче 5 символов.",
      },
    },
    placeholder: "Дмитрий Иванов",
    label: "Имя Пользователя",
    description: "Введите имя пользователя",
  },
  {
    key: 2,
    type: "password",
    name: "password",
    registerConfig: {
      required: "Поле 'пароль' обязательно к заполнению.",
    },
    placeholder: "Ваш очень сложный пароль",
    label: "Пароль",
    description: "Введите пароль",
  },
];
