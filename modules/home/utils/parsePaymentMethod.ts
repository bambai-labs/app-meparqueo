import { PaymentMethod } from '../types'

export const parsePaymentMethod = (method: PaymentMethod) => {
  const mapper: Record<PaymentMethod, string> = {
    [PaymentMethod.CASH]: 'Efectivo',
    [PaymentMethod.TRANSFER]: 'Transferencia bancaria',
    [PaymentMethod.CARD]: 'Tarjeta de crédito/débito',
    [PaymentMethod.PAYMENT_APP]: 'App de pagos (Nequi, Daviplata)',
    [PaymentMethod.MEMBERSHIP]: 'Membresía/Mensualidad',
    [PaymentMethod.PSE]: 'Pago por PSE',
    [PaymentMethod.BALOTO]: 'Baloto',
    [PaymentMethod.EFECTY]: 'Efecty',
    [PaymentMethod.CREDICOP]: 'Crédito Cop',
    [PaymentMethod.CREDIAGRO]: 'Crediagro',
    [PaymentMethod.CONSIGNMENT]: 'Consignación bancaria',
    [PaymentMethod.PAY_ONLINE]: 'Pago en línea',
    [PaymentMethod.PAYPAL]: 'PayPal',
    [PaymentMethod.BANCOLOMBIA_APP]: 'Bancolombia a la mano',
    [PaymentMethod.DAVIVIENDA_APP]: 'Davivienda APP',
    [PaymentMethod.GIFT_CARD]: 'Tarjeta regalo',
    [PaymentMethod.LOYALTY_POINTS]: 'Puntos de fidelidad',
    [PaymentMethod.CREDIT_NOTE]: 'Nota crédito',
    [PaymentMethod.POSTDATED_CHECK]: 'Cheque posfechado',
    [PaymentMethod.PAYROLL_DEDUCTION]: 'Deducción nómina',
    [PaymentMethod.CREDIT]: 'Crédito directo',
    [PaymentMethod.CRYPTOCURRENCY]: 'Criptomonedas',
    [PaymentMethod.PAY_LATER]: 'Pago posterior',
  }

  return mapper[method]
}
