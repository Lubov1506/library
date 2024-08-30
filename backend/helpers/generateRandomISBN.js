const calculateCheckDigit = (isbn) => {
  const digits = isbn.split("").map(Number);
  const sum = digits.reduce((acc, digit, index) => {
    return acc + digit * (index % 2 === 0 ? 1 : 3);
  }, 0);

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit;
};
export const generateRandomISBN = () => {
  const prefix = "978";
  const group = "3";
  const publisher = Math.floor(1000 + Math.random() * 9000)
    .toString()
    .slice(0, 2);
  const title = Math.floor(100000 + Math.random() * 900000)
    .toString()
    .slice(0, 6);

  const partialISBN = `${prefix}${group}${publisher}${title}`;

  const checkDigit = calculateCheckDigit(partialISBN);

  return `${prefix}-${group}-${publisher}-${title}-${checkDigit}`;
};

