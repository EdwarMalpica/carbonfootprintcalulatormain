export interface TransportationData {
  carMileage: number
  carEfficiency: number
  publicTransport: number
}

export interface HomeEnergyData {
  electricityUsage: number
  renewablePercentage: number
}

export interface FoodData {
  meatConsumption: number
  foodWaste: number
}

export interface CarbonData {
  transportation: TransportationData
  homeEnergy: HomeEnergyData
  food: FoodData
}

export interface FootprintResults {
  transportation: number
  homeEnergy: number
  food: number
  total: number
}

