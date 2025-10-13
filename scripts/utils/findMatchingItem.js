export function findMatchingItem(array, value, key = "productId") {
  return array.find((arrayItem) => arrayItem[key] === value);
}
