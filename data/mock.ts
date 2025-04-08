import {
  ParkingLot,
  ParkingLotAvailability,
  ParkingStatus,
  PaymentMethod,
  Service,
} from '@/modules'

export const mockParkingResults: ParkingLot[] = [
  {
    id: '1',
    name: 'Parqueadero 1',
    availability: ParkingLotAvailability.MORE_THAN_FIVE,
    status: ParkingStatus.OPEN,
    latitude: 8.7627,
    longitude: -75.87055,
    price: 3400,
    imageUrls: [
      'https://empirestateplaza.ny.gov/sites/g/files/oee991/files/media/2018/10/ogs-parking-lots-221.jpg',
      'https://everlinecoatings.com/us/wp-content/uploads/sites/2/2022/02/lifespan-of-an-asphalt-parking-lot-01.jpg',
      'https://nvmpaving.com/wp-content/uploads/2021/07/Untitled-design-2021-07-30T193537.840-1024x768.png',
    ],
    paymentMethods: [
      PaymentMethod.CASH,
      PaymentMethod.TRANSFER,
      PaymentMethod.CARD,
    ],
    services: [
      Service.SECURITY,
      Service.CAR_WASH,
      Service.VALET_PARKING,
      Service.COVERED,
    ],
    phoneNumber: '+3455556786',
    distanceKm: 3,
    address: 'Av Ceja el mango',
  },
  {
    id: '2',
    name: 'Parqueadero 2',
    availability: ParkingLotAvailability.LESS_THAN_FIVE,
    status: ParkingStatus.CLOSED,
    latitude: 8.772694,
    longitude: -75.863256,
    price: 3800,
    imageUrls: [
      'https://lirp.cdn-website.com/md/unsplash/dms3rep/multi/opt/photo-1506521781263-d8422e82f27a-1920w.jpg',
      'https://everlinecoatings.com/us/wp-content/uploads/sites/2/2022/03/The-Key-Elements-of-a-Safe-Attractive-Parking-Lot-Design.jpg',
      'https://grist.org/wp-content/uploads/2012/06/parking-lot.jpg?quality=75&strip=all',
    ],
    paymentMethods: [
      PaymentMethod.CASH,
      PaymentMethod.TRANSFER,
      PaymentMethod.CARD,
    ],
    services: [
      Service.SECURITY,
      Service.CAR_WASH,
      Service.VALET_PARKING,
      Service.COVERED,
    ],
    phoneNumber: '+3455556786',
    distanceKm: 3,
    address: 'Av Ceja el mango',
  },
]
