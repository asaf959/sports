import { User } from "../interface/user";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setUser = (user: any) => {
  window.sessionStorage.setItem("session", JSON.stringify(user));
};

export const getCurrentUser = (): User => JSON.parse(window.sessionStorage.getItem("session") || "{}");

export const removeUser = () => {
  window.sessionStorage.removeItem("session");
};
