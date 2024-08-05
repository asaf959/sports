import { pickBy } from "lodash";


// import formDataApi from "./formDataInstance";
import jsonApi from "./jsonInstance";
import { ForgotPasswordInterface, LoginInterface, ResetPasswordInterface, SignupInterface } from "../interface/auth"
import { Role } from "../pages/users";
interface Sport {
  sport: string;
  league: string;
}
interface SportData extends Sport {
  date?: string;
  team?: string;
  timezone: number
}
interface CombinationData extends Sport {
  combination: {
    name: string;
    league: string;
  }[]
}
interface ChannelData extends Sport {
  alternateLinks: {
    title: string;
    link: string;
  }[]
}
interface AddMasterLinkData extends Sport {
  link: string
}
interface TeamData {
  sport: string;
  league: string;
}

type LinkType = {
  title?: string
  link?: string
}
interface StreamingLinkData extends Sport {
  streamingLinks: LinkType[];
  externalLinks: LinkType[];
  date: Date
  timezone?: number
}

interface Matchesdata extends Sport, TeamData {
  date: Date;
  matchId: string;
  eventId: string;
  isLocal: boolean;
  description?: string
  note?: string
  competitors: any[],
  timezone: number
}
interface UserUpdateProfileType {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const userKey = "6iu8j3guht44yre65h";
export const encryptionPassword = "@@0Linknbit99!!";

export const queryParams = (params: { [key: string]: string }) => (pickBy(params) ? `?${new URLSearchParams(pickBy(params)).toString()}` : "");

// type GetParams = {
//   [key: string]: string | undefined;
//   /** Fields to fetch from the database */
//   fields?: string;
//   /** Sorts data on the basis of the fields written. Add `-` to invert the order */
//   sort?: string;
//   /** Checks if fields should be populated or not */
//   populate?: string;
//   /** Page number */
//   page?: string;
//   /** Limit of data per page */
//   limit?: string;
// };

const API_CALL = {
  // auth
  isLoggedIn: async () => jsonApi.get(`auth/is-logged-in`),
  login: async (data: LoginInterface) => jsonApi.post(`auth/login`, data),
  register: async (data: SignupInterface) => jsonApi.post(`auth/signup`, data),
  forgotPassword: async (data: ForgotPasswordInterface) => jsonApi.post(`auth/forgot-password`, data),
  resetPassword: async (token: string, data: ResetPasswordInterface) => jsonApi.post(`auth/reset-password/${token}`, data),
  verifyEmail: async (token: string) => jsonApi.post(`auth/verify-email/${token}`),
  logout: async () => jsonApi.post(`auth/logout`),

  // users
  getUsers: async () => jsonApi.get(`managers`),
  updateRole: async (id: string, role: Role) => jsonApi.patch(`managers/${id}`, { role }),
  deleteUser: async (id: string) => jsonApi.delete(`managers/${id}`),
  // matches
  getMatches: async (data: SportData) => jsonApi.get(`sports/matches/${data.sport}/${data.league}/${data?.date}/${data.timezone}`),

  // add streaming links
  addStreamingLink: async (data: StreamingLinkData) => jsonApi.post(`sports/links/`, data),
  updateStreamingLink: async (id: string, data: StreamingLinkData) => jsonApi.patch(`sports/links/${id}`, data),
  addMatches: async (data: Matchesdata) => jsonApi.post(`sports`, data),
  deleteMatch: async (id: string) => jsonApi.delete(`sports/${id}`),

  // teams
  getTeams: async (data: TeamData) => jsonApi.get(`sports/teams/${data.sport}/${data.league}`),

  // update me
  updateMe: async (data: UserUpdateProfileType) => jsonApi.patch(`auth/update-me`, data),

  //
  addMasterLink: async (data: AddMasterLinkData) => jsonApi.post("sports/master-link/", data),
  getMasterLink: async (sport: string, league: string) => jsonApi.get(`sports/master-link/${sport}/${league}`),

  createCombination: async (data: CombinationData) => jsonApi.post("sports/combination", data),
  getCombination: async (sport: string, league: string) => jsonApi.get(`sports/combination/${sport}/${league}`),

  createChannel: async (data: ChannelData) => jsonApi.post("channels/", data),
  getChannels: async (sport: string, league: string) => jsonApi.get(`channels/${sport}/${league}`),

  createAlternativeLink: async (data: ChannelData) => jsonApi.post("alternate-links/", data),
  getAlternativeLinks: async (sport: string, league: string) => jsonApi.get(`alternate-links/${sport}/${league}`),

  getMatchesOfMasterWebsite: async (data: SportData) => jsonApi.get(`sports/master-matches/${data.sport}/${data.league}/${data.date}`),
  getTeamMatches: async (data: SportData) => jsonApi.get(`sports/team-matches/${data.sport}/${data.league}/${data.team}/${data.date}`),
};

export default API_CALL;
