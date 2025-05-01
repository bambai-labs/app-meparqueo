import { Service } from '../types'

export const parseService = (service: Service) => {
  const mapper: Record<Service, string> = {
    [Service.SECURITY]: 'Seguridad',
    [Service.CAR_WASH]: 'Lavado de autos',
    [Service.VALET_PARKING]: 'Aparcacoches',
    [Service.COVERED]: 'Cubierto',
    [Service.TWENTY_FOUR_HOURS]: 'Abierto 24 horas',
    [Service.EVC_CHARGER]: 'Cargador para vehículos eléctricos',
    [Service.MOTORCYCLE_AREA]: 'Área para motos',
    [Service.TRAILER_PARKING]: 'Espacio para trailers',
    [Service.UNDERGROUND]: 'Parqueadero subterráneo',
    [Service.DISABLED_ACCESS]: 'Acceso para discapacitados',
    [Service.TIRE_INFLATION]: 'Inflado de llantas',
    [Service.VIDEO_SURVEILLANCE]: 'Videovigilancia',
    [Service.OIL_CHECK]: 'Revisión de aceite',
    [Service.BATTERY_CHARGE]: 'Carga de baterías',
    [Service.VEHICLE_INSPECTION]: 'Inspección técnica',
    [Service.DETAILING]: 'Detallado automotriz',
    [Service.LOCKER_SERVICE]: 'Servicio de locker',
    [Service.RESTROOM]: 'Baños disponibles',
    [Service.WI_FI]: 'Wi-Fi gratuito',
    [Service.CAFETERIA]: 'Cafetería',
    [Service.TOW_SERVICE]: 'Servicio de grúa',
    [Service.INSURANCE]: 'Seguro contra daños',
    [Service.CHILD_AREA]: 'Área infantil',
    [Service.PET_AREA]: 'Área para mascotas',
    [Service.BIKE_PARKING]: 'Parqueadero para bicicletas',
    [Service.TIRE_CHANGE]: 'Cambio de llantas',
    [Service.VEHICLE_TUNING]: 'Afinamiento básico',
    [Service.MONTHLY_PLAN]: 'Plan mensual',
    [Service.ADVANCE_RESERVATION]: 'Reserva anticipada',
    [Service.PHONE_CHARGING]: 'Carga de celulares',
  }

  return mapper[service]
}
