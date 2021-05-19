/** Contains the api constants.  */

export const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
export const LOGIN = "/auth/login";
export const REGISTER = "/auth/register";

export const CLUB_LIST = "/club/all";
export const SUB_CLUB_LIST = "/subclub/all";
export const SUB_CLUB_STATS = "/subclub/statistics";

export const GET_POSTS = "/post";
export const CREATE_POST = "/post/create";
export const REPORT_POST = "/post/report";
export const UPVOTE_POST = "/post/upvote";
export const DOWNVOTE_POST = "/post/downvote";
export const TRENDS = "/trends";
export const SUBCLUB_POSTS = "/subClubPosts";

export const LOGIN_WITH_TOKEN = "/auth/login_with_token";



