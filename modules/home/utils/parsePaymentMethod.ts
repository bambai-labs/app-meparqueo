import { PaymentMethod } from '../types'

export const parsePaymentMethod = (paymentMethod: PaymentMethod) => {
  const mapper: Record<PaymentMethod, string> = {
    [PaymentMethod.CASH]: 'Efectivo',
    [PaymentMethod.TRANSFER]: 'Transferencia',
    [PaymentMethod.CARD]: 'Tarjeta',
  }

  return mapper[paymentMethod]
}
