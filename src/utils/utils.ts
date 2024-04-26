import DateObject from "react-date-object";

export const dateFormatter = (date: Date | string, format?: string) => new DateObject(date).format(format);

export const calculateMonths = (date: Date, months: number, add = false) => {
  if (add) return new Date(date.setMonth(date.getMonth() + months));

  return new Date(date.setMonth(date.getMonth() - months));
};

export const idFormatter = (val: number) => `000${val}`.slice(-4);
export const trainerIdFormatter = (val: number) => `T-${val}`.slice(-6);
export const memberIdFormatter = (val: number) => `M-${val}`.slice(-6);
export const invoiceIdFormatter = (val: number) => `I-${val}`.slice(-6);

export const isNewMember = (data: Date | undefined): boolean => {
  if (!data) {
    return false; // Return false for undefined date
  }
  const currentTime = new Date().getTime();
  const memberTime = new Date(data).getTime();
  const timeSpan = currentTime - memberTime;
  const monthTimeSpan = 1000 * 60 * 60 * 24 * 30;
  if (timeSpan > monthTimeSpan) {
    return false;
  }

  return true;
};

export type currencyNotation = "standard" | "scientific" | "engineering" | "compact";
export const currencyFormatter = (amount: number, notation: currencyNotation = "standard") =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    notation,
    maximumFractionDigits: 0
  }).format(amount);

export const currencyToNumber = (currency: string) => parseInt(currency.replace(/[^0-9]/g, ""), 10);

export const getField = (val: string | number) => val || "-";

export const hexToRGB = (hex: string): [number, number, number] => {
  // Remove the # symbol if present
  const hexCode = hex.replace(/^#/, "");
  // Parse the hex string into three parts
  const r = parseInt(hexCode.slice(0, 2), 16);
  const g = parseInt(hexCode.slice(2, 4), 16);
  const b = parseInt(hexCode.slice(4, 6), 16);

  return [r, g, b];
};

export const restrictNumbersOnly = (str: string) => {
  const re = /^[0-9\b]+$/;

  if (str === "" || re.test(str)) return str;

  const inputArray = str.split("");
  const numericArray = inputArray.filter(element => !Number.isNaN(parseInt(element, 10))).join("");

  return numericArray;
};

type SportData = {
  sport: string
  league: string
}
export const getSportFromSession = (): SportData => JSON.parse(sessionStorage.getItem("sport") || "{}");