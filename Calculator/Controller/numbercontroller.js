const axios = require("axios");

const WN_SZ = 10;
let NoofWindow = [];
const noidmapping = {
  p: "primes",
  e: "even",
  f: "fibonacci",
  r: "random",
};

const bearerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxMTM5NjIyLCJpYXQiOjE3MjExMzkzMjIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjU5NmIwNzRkLTA5MDktNGIwNy05NzMzLWM2YzY2MmU0M2M3ZSIsInN1YiI6IjEyNTAwMzM3MEBzYXN0cmEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJTYXN0cmEgVW5pdmVyc2l0eSIsImNsaWVudElEIjoiNTk2YjA3NGQtMDkwOS00YjA3LTk3MzMtYzZjNjYyZTQzYzdlIiwiY2xpZW50U2VjcmV0IjoiaWdISlNzSXdVTXNLQlJXdCIsIm93bmVyTmFtZSI6IlRoYXJ1bmFuIiwib3duZXJFbWFpbCI6IjEyNTAwMzM3MEBzYXN0cmEuYWMuaW4iLCJyb2xsTm8iOiIxMjUwMDMzNzAifQ.IgxhntOIgTRPNCmRf1Xkw2YJAaljh6fI9dJ0aa3YzGs";

const NumbersFetching = async (numberId) => {
  const numberType = noidmapping[numberId];

  try {
    const No_array = await axios.get(
      `http://20.244.56.144/test/${numberType}`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        timeout: 3000,
      }
    );
    return No_array.data.numbers;
  } catch (error) {
    console.error(`Error fetching numbers: ${error.message}`);
    return [];
  }
};
const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return (sum / numbers.length).toFixed(2);
};

const getNumbers = async (req, res) => {
  const { numberid: numberId } = req.params;

  const NumbersFetched = await NumbersFetching(numberId);
  const UniqueNOS = [...new Set(NumbersFetched)];
  const previousState = [...NoofWindow];

  NoofWindow = [...NoofWindow, ...UniqueNOS].slice(-WN_SZ);

  const currentState = [...NoofWindow];
  const average = calculateAverage(NoofWindow);

  const No_array = {
    numbers: UniqueNOS,
    windowPrevState: previousState,
    windowCurrState: currentState,
    avg: parseFloat(average),
  };
  res.json(No_array);
};

module.exports = {
  getNumbers,
};
