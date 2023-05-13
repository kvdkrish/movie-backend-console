export const iterator = (val: number, startIdx: number = 0) => {
  const arr: number[] = [];
  if (!val) return arr;
  for (let i = startIdx; i < val; i += 1) {
    arr.push(i);
  }
  return arr;
};
