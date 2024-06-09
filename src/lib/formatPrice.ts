export const formatPrice = (price: number) => {
  return price === 0 ? '無料' : `${price.toLocaleString()}円`
}
