const express = require("express");

const app = express();
const PORT = process.env.PORT || 56201;

// Встроенный middleware для обработки JSON-тела запроса
app.use(express.json());

// Встроенный middleware для обработки URL-кодированного тела запроса
app.use(express.urlencoded({ extended: true }));

// Квадрат числа
app.post("/square", (req, res) => {
  const number = parseFloat(req.body);
  if (isNaN(number)) {
    return res.status(400).json({ error: "Invalid number" });
  }
  const square = number * number;
  res.json({ number, square });
});

// Реверс текста
app.post("/reverse", (req, res) => {
  const reversedText = req.body.split("").reverse().join("");
  res.send(reversedText);
});

// Данные о дате
app.get("/date/:year/:month/:day", (req, res) => {
  const { year, month, day } = req.params;
  const date = new Date(year, month - 1, day); // Месяцы начинаются с 0

  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: "Invalid date" });
  }

  const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const today = new Date();
  const difference = Math.abs(Math.floor((today - date) / (1000 * 60 * 60 * 24)));

  res.json({ weekDay, isLeapYear, difference });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
