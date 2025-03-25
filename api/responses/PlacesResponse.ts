export interface PlacesResponse {
  places: Place[]
}

export interface Place {
  formattedAddress: string
  location: Location
  displayName: DisplayName
  priceLevel?: string
}

export interface DisplayName {
  text: string
  languageCode: LanguageCode
}

export enum LanguageCode {
  En = 'en',
  Es = 'es',
}

export interface Location {
  latitude: number
  longitude: number
}
