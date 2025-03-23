import type { CarbonData, FootprintResults } from "./types"

// Constants for carbon calculations
const CARBON_CONSTANTS = {
  // Transportation (in kg CO2 per mile)
  CAR_EMISSIONS_PER_GALLON: 8.89, // kg CO2 per gallon of gasoline
  PUBLIC_TRANSPORT_EMISSIONS_PER_MILE: 0.14, // kg CO2 per mile

  // Home Energy
  ELECTRICITY_EMISSIONS_PER_KWH: 0.4, // kg CO2 per kWh

  // Food
  MEAT_EMISSIONS_PER_SERVING: 3.0, // kg CO2 per serving
  FOOD_WASTE_FACTOR: 0.01, // 1% increase per 1% of food waste
}

export function calculateTotalFootprint(data: CarbonData): FootprintResults {
  // Calculate transportation footprint
  const carEmissions =
    (data.transportation.carMileage / data.transportation.carEfficiency) * CARBON_CONSTANTS.CAR_EMISSIONS_PER_GALLON
  const publicTransportEmissions =
    data.transportation.publicTransport * CARBON_CONSTANTS.PUBLIC_TRANSPORT_EMISSIONS_PER_MILE
  const transportationTotal = (carEmissions + publicTransportEmissions) / 1000 // Convert to tons

  // Calculate home energy footprint
  const electricityEmissions =
    data.homeEnergy.electricityUsage *
    12 * // Annual usage
    CARBON_CONSTANTS.ELECTRICITY_EMISSIONS_PER_KWH *
    (1 - data.homeEnergy.renewablePercentage / 100)
  const homeEnergyTotal = electricityEmissions / 1000 // Convert to tons

  // Calculate food footprint
  const meatEmissions =
    data.food.meatConsumption *
    52 * // Annual consumption
    CARBON_CONSTANTS.MEAT_EMISSIONS_PER_SERVING
  const foodWasteIncrease = meatEmissions * data.food.foodWaste * CARBON_CONSTANTS.FOOD_WASTE_FACTOR
  const foodTotal = (meatEmissions + foodWasteIncrease) / 1000 // Convert to tons

  // Calculate total footprint
  const total = transportationTotal + homeEnergyTotal + foodTotal

  return {
    transportation: transportationTotal,
    homeEnergy: homeEnergyTotal,
    food: foodTotal,
    total,
  }
}

