function romanToInt(value) {
  const values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0;

  for (let index = 0; index < value.length; index += 1) {
    const current = values[value[index]];
    const next = values[value[index + 1]];

    if (!current) {
      throw new Error("Input must contain valid Roman numeral characters.");
    }

    if (next && current < next) {
      total -= current;
    } else {
      total += current;
    }
  }

  return total;
}

module.exports = romanToInt;
