import { appRole, } from "../interface";
import { accountType as accountInterface, transactionType as transactionInterface } from "../interface/invoice";

export const genderData = [
  {
    name: "Male",
    value: "male"
  },
  {
    name: "Female",
    value: "female"
  }
];

export const transactionTypes = [
  {
    name: "In",
    value: "in",
    allow: ["admin", "moderator", "gym-owner", "gym-manager"]
  },
  {
    name: "Out",
    value: "out",
    allow: ["gym-owner", "gym-manager"]
  }
];

type roleType = appRole;

interface accountsInterface {
  name: string;
  value: accountInterface;
  transactionType: transactionInterface;
  allow: roleType[];
}

// export const accountTypes = (role: roleType, transactionType: transactionInterface) => {
//   const accounts: accountsInterface[] = [
//     {
//       name: "Member",
//       value: "member",
//       transactionType: "in",
//       allow: ["gym-owner", "gym-manager"]
//     },
//     {
//       name: "Trainer",
//       value: "trainer",
//       transactionType: "out",
//       allow: ["gym-owner", "gym-manager"]
//     },
//     {
//       name: "User",
//       value: "user",
//       transactionType: role === "admin" || role === "moderator" ? "in" : "out",
//       allow: ["admin", "moderator", "gym-owner"]
//     },
//     {
//       name: "Expense",
//       value: "expense",
//       transactionType: "out",
//       allow: ["gym-owner", "gym-manager"]
//     }
//   ];
//   const roleFiltering = accounts.filter(val => val.allow.includes(role));
//   const transactionFiltering = roleFiltering
//     .filter(val => val.transactionType === transactionType)
//     .map(val => ({ name: val.name, value: val.value }));

//   return transactionFiltering;
// };

export interface Month {
  name: string;
  abbreviation: string;
  days: number;
}
export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const monthAbbrs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const months: Month[] = monthNames.map((val, idx) => ({ name: val, abbreviation: monthAbbrs[idx], days: monthDays[idx] }));

export type reportTypes = "profit" | "expense" | "income";

export interface Report {
  name: string;
  values: reportTypes;
}

const reportType = ["Income", "Expenses", "Profit"];
const reportValues: reportTypes[] = ["income", "expense", "profit"];
export const reports: Report[] = reportType.map((val, idx) => ({ name: val, values: reportValues[idx] }));
