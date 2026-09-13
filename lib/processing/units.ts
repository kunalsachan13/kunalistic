export type UnitDomain =
  | "length"
  | "weight"
  | "temperature"
  | "area"
  | "volume"
  | "digital"
  | "speed"
  | "time";

export interface UnitOption {
  id: string;
  name: string;
  symbol: string;
  ratioToBase: number; // For linear conversions, relative to domain base unit
}

export interface DomainDefinition {
  id: UnitDomain;
  name: string;
  baseUnit: string;
  units: UnitOption[];
}

export const UNIT_DOMAINS: DomainDefinition[] = [
  {
    id: "length",
    name: "Length",
    baseUnit: "m",
    units: [
      { id: "m", name: "Meters", symbol: "m", ratioToBase: 1 },
      { id: "km", name: "Kilometers", symbol: "km", ratioToBase: 1000 },
      { id: "cm", name: "Centimeters", symbol: "cm", ratioToBase: 0.01 },
      { id: "mm", name: "Millimeters", symbol: "mm", ratioToBase: 0.001 },
      { id: "mi", name: "Miles", symbol: "mi", ratioToBase: 1609.344 },
      { id: "yd", name: "Yards", symbol: "yd", ratioToBase: 0.9144 },
      { id: "ft", name: "Feet", symbol: "ft", ratioToBase: 0.3048 },
      { id: "in", name: "Inches", symbol: "in", ratioToBase: 0.0254 },
    ]
  },
  {
    id: "weight",
    name: "Weight / Mass",
    baseUnit: "kg",
    units: [
      { id: "kg", name: "Kilograms", symbol: "kg", ratioToBase: 1 },
      { id: "g", name: "Grams", symbol: "g", ratioToBase: 0.001 },
      { id: "mg", name: "Milligrams", symbol: "mg", ratioToBase: 0.000001 },
      { id: "lb", name: "Pounds", symbol: "lb", ratioToBase: 0.45359237 },
      { id: "oz", name: "Ounces", symbol: "oz", ratioToBase: 0.028349523125 },
      { id: "ton", name: "Metric Tonnes", symbol: "t", ratioToBase: 1000 },
    ]
  },
  {
    id: "temperature",
    name: "Temperature",
    baseUnit: "c",
    units: [
      { id: "c", name: "Celsius", symbol: "°C", ratioToBase: 1 },
      { id: "f", name: "Fahrenheit", symbol: "°F", ratioToBase: 1 },
      { id: "k", name: "Kelvin", symbol: "K", ratioToBase: 1 },
    ]
  },
  {
    id: "digital",
    name: "Digital Storage",
    baseUnit: "byte",
    units: [
      { id: "byte", name: "Bytes", symbol: "B", ratioToBase: 1 },
      { id: "kb", name: "Kilobytes", symbol: "KB", ratioToBase: 1024 },
      { id: "mb", name: "Megabytes", symbol: "MB", ratioToBase: 1024 * 1024 },
      { id: "gb", name: "Gigabytes", symbol: "GB", ratioToBase: 1024 * 1024 * 1024 },
      { id: "tb", name: "Terabytes", symbol: "TB", ratioToBase: 1024 * 1024 * 1024 * 1024 },
    ]
  },
  {
    id: "speed",
    name: "Speed",
    baseUnit: "mps",
    units: [
      { id: "mps", name: "Meters per second", symbol: "m/s", ratioToBase: 1 },
      { id: "kmh", name: "Kilometers per hour", symbol: "km/h", ratioToBase: 0.277778 },
      { id: "mph", name: "Miles per hour", symbol: "mph", ratioToBase: 0.44704 },
      { id: "knot", name: "Knots", symbol: "kn", ratioToBase: 0.514444 },
    ]
  },
  {
    id: "time",
    name: "Time",
    baseUnit: "s",
    units: [
      { id: "s", name: "Seconds", symbol: "s", ratioToBase: 1 },
      { id: "min", name: "Minutes", symbol: "min", ratioToBase: 60 },
      { id: "hr", name: "Hours", symbol: "hr", ratioToBase: 3600 },
      { id: "day", name: "Days", symbol: "d", ratioToBase: 86400 },
      { id: "wk", name: "Weeks", symbol: "wk", ratioToBase: 604800 },
    ]
  }
];

export function convertUnits(
  domainId: UnitDomain,
  value: number,
  fromUnitId: string,
  toUnitId: string
): number {
  if (isNaN(value)) return 0;
  if (fromUnitId === toUnitId) return value;

  if (domainId === "temperature") {
    // Special non-linear conversion
    let celsius = value;
    if (fromUnitId === "f") {
      celsius = ((value - 32) * 5) / 9;
    } else if (fromUnitId === "k") {
      celsius = value - 273.15;
    }

    if (toUnitId === "c") return parseFloat(celsius.toFixed(4));
    if (toUnitId === "f") return parseFloat(((celsius * 9) / 5 + 32).toFixed(4));
    if (toUnitId === "k") return parseFloat((celsius + 273.15).toFixed(4));
    return value;
  }

  const domain = UNIT_DOMAINS.find((d) => d.id === domainId);
  if (!domain) return value;

  const fromUnit = domain.units.find((u) => u.id === fromUnitId);
  const toUnit = domain.units.find((u) => u.id === toUnitId);

  if (!fromUnit || !toUnit) return value;

  const baseValue = value * fromUnit.ratioToBase;
  const targetValue = baseValue / toUnit.ratioToBase;

  return parseFloat(targetValue.toPrecision(7));
}
