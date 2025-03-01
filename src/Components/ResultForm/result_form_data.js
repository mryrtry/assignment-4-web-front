export const resultFormData = [
  {
    key: 10,
    type: "text",
    name: "x",
    registerConfig: {
      required: "Поле 'X' обязательно к заполнению.",
      validate: {
        isFloat: (value) => {
          const floatValue = parseFloat(value);
          return !isNaN(floatValue) && floatValue.toString() === value.toString()
            ? true
            : "Значение должно быть числом с плавающей точкой";
        },
        inRange: (value) => {
          const floatValue = parseFloat(value);
          const minValue = -5.5;
          const maxValue = 5.5;
          return floatValue >= minValue && floatValue <= maxValue
            ? true
            : `Значение должно быть между ${minValue} и ${maxValue}`;
        },
      },
    },
    placeholder: "2.25",
    label: "Значение поля X",
    description: "Введите значение X",
  },
  {
    key: 11,
    type: "text",
    name: "y",
    registerConfig: {
      required: "Поле 'Y' обязательно к заполнению.",
      validate: {
        isFloat: (value) => {
          const floatValue = parseFloat(value);
          return !isNaN(floatValue) && floatValue.toString() === value.toString()
            ? true
            : "Значение должно быть числом с плавающей точкой";
        },
        inRange: (value) => {
          const floatValue = parseFloat(value);
          const minValue = -5.5;
          const maxValue = 5.5;
          return floatValue >= minValue && floatValue <= maxValue
            ? true
            : `Значение должно быть между ${minValue} и ${maxValue}`;
        },
      },
    },
    placeholder: "-3.15",
    label: "Значение поля Y",
    description: "Введите значение Y",
  },
];
