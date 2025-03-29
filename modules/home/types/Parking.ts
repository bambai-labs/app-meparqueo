export interface ParkingLot {
  id: string
  name: string
  availability: ParkingLotAvailability
  status: ParkingStatus
  latitude: number
  longitude: number
  price: number
  imageUrls: string[]
  paymentMethods: PaymentMethod[]
  services: Service[]
  phoneNumber: string
  distanceKm: number
  address: string
}

export enum PaymentMethod {
  CASH = 'CASH',
  TRANSFER = 'TRANSFER',
  CARD = 'CARD',
  PAYMENT_APP = 'PAYMENT_APP',
  MEMBERSHIP = 'MEMBERSHIP',
  PSE = 'PSE',
  BALOTO = 'BALOTO',
  EFECTY = 'EFECTY',
  CREDICOP = 'CREDICOP',
  CREDIAGRO = 'CREDIAGRO',
  CONSIGNMENT = 'CONSIGNMENT',
  PAY_ONLINE = 'PAY_ONLINE',
  PAYPAL = 'PAYPAL',
  BANCOLOMBIA_APP = 'BANCOLOMBIA_APP',
  DAVIVIENDA_APP = 'DAVIVIENDA_APP',
  GIFT_CARD = 'GIFT_CARD',
  LOYALTY_POINTS = 'LOYALTY_POINTS',
  CREDIT_NOTE = 'CREDIT_NOTE',
  POSTDATED_CHECK = 'POSTDATED_CHECK',
  PAYROLL_DEDUCTION = 'PAYROLL_DEDUCTION',
  CREDIT = 'CREDIT',
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',
  PAY_LATER = 'PAY_LATER',
}

export enum Service {
  SECURITY = 'SECURITY',
  CAR_WASH = 'CAR_WASH',
  VALET_PARKING = 'VALET_PARKING',
  COVERED = 'COVERED',
  TWENTY_FOUR_HOURS = 'TWENTY_FOUR_HOURS',
  EVC_CHARGER = 'EVC_CHARGER',
  MOTORCYCLE_AREA = 'MOTORCYCLE_AREA',
  TRAILER_PARKING = 'TRAILER_PARKING',
  UNDERGROUND = 'UNDERGROUND',
  DISABLED_ACCESS = 'DISABLED_ACCESS',
  TIRE_INFLATION = 'TIRE_INFLATION',
  VIDEO_SURVEILLANCE = 'VIDEO_SURVEILLANCE',
  OIL_CHECK = 'OIL_CHECK',
  BATTERY_CHARGE = 'BATTERY_CHARGE',
  VEHICLE_INSPECTION = 'VEHICLE_INSPECTION',
  DETAILING = 'DETAILING',
  LOCKER_SERVICE = 'LOCKER_SERVICE',
  RESTROOM = 'RESTROOM',
  WI_FI = 'WI_FI',
  CAFETERIA = 'CAFETERIA',
  TOW_SERVICE = 'TOW_SERVICE',
  INSURANCE = 'INSURANCE',
  CHILD_AREA = 'CHILD_AREA',
  PET_AREA = 'PET_AREA',
  BIKE_PARKING = 'BIKE_PARKING',
  TIRE_CHANGE = 'TIRE_CHANGE',
  VEHICLE_TUNING = 'VEHICLE_TUNING',
}

export enum ParkingLotAvailability {
  LESS_THAN_FIVE = 'LESS_THAN_FIVE',
  MORE_THAN_FIVE = 'MORE_THAN_FIVE',
  NO_AVAILABILITY = 'NO_AVAILABILITY',
}

export enum ParkingStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface RecentParkingLot extends ParkingLot {
  timestamp: number
}

export interface ParkingUpdateEstatus {
  id: string
  parkingLotId: string
  status: ParkingStatus
  availability: ParkingLotAvailability
  updatedAt: string
}
