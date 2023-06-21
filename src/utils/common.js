export const incrementPage = ({ rows, page }) => {
  let count = 0;
  let startIndex = 0;
  let finalNumber = 0;
  const newRow = rows.map((item, index) => {
    if (page <= 1) {
      count = index + 1;
      item.no = count;
    } else {
      startIndex = Number(`${page}0`) - 10;
      finalNumber = Number(startIndex) + index + 1;
      item.no = finalNumber;
    }
    return item;
  });
  return newRow;
};
