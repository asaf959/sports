import { create } from "zustand";

type UserData = {
  isVerified: boolean;
  role: string;
  permissions: string[];
  profileImage: string;
  createdAt: Date;
  _id: string;
  email: string;
  name: string;
  phone: string;
  gender: "male" | "female";
  __v: 0;
  id: string;
};

type LoginStatus = "pending" | "loggedin" | "loggedinwithoutgym" | "loggedout";

interface State {
  loginStatus: LoginStatus;
  setloginStatus: (val: LoginStatus) => void;

  userData: null | UserData;
  setUserData: (val: null | UserData) => void;

  title: string;
  setTitle: (title: string) => void;

  sidebar: boolean;
  setSidebar: (val?: boolean) => void;

  pageAlert: null | {
    type: "error" | "success" | "info" | "warning";
    message: string;
  };
  setPageAlert: (val: State["pageAlert"]) => void;
}

const useStore = create<State>()(set => ({
  loginStatus: "pending",
  setloginStatus: (val: State["loginStatus"]) => set({ loginStatus: val }),

  userData: null,
  setUserData: (userData: State["userData"]) => set({ userData }),

  title: "",
  setTitle: (title: string) => set({ title }),

  sidebar: false,
  setSidebar: (val?: boolean) => set(({ sidebar }) => ({ sidebar: val ?? !sidebar })),

  pageAlert: null,
  setPageAlert: (val: State["pageAlert"]) => set(() => ({ pageAlert: val }))
}));

export default useStore;
