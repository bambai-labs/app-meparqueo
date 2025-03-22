export const formatCurrency = (value: number): string => {
  const strValue = value.toString()
  const formatted = strValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

  return `$${formatted}`
}
