export function calculateSummary(cart) {
  const summary = cart
    .map(item => item.count * item.price)
    .reduce((prevPrice, price) => prevPrice + price);

  return summary.toFixed(2);
}