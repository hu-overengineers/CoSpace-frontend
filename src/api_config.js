/** Contains the api constants.  */

export const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
export const AUTH = "/auth";
export const LOGIN = "/auth/login";
export const REGISTER = "/auth/register";

export const CLUB_LIST = "/club/all";
export const SUB_CLUB = "/subclub";
export const COMMON_SUB_CLUBS = "/common-subclubs";
export const SUB_CLUB_LIST = "/subclub/all";
export const SUB_CLUB_STATS = "/subclub/statistics";
export const SUB_CLUB_EVENTS = "/subclub/events";
export const ATTEND_SUB_CLUB_EVENT = "/subclub/attend-event";
export const SUB_CLUB_QUESTIONNAIRE = "/subclub/questionnaire-sub";
export const ONE_SUB_CLUB_ENROLL = "/subclub/enroll-subclub";

export const MODERATOR = "/moderator";
export const EVENT = "/event";

// TODO: Fix some inconsistencies in naming.
export const GET_POSTS = "/post";
export const CREATE_POST = "/post/create";
export const REPORT_POST = "/post/report";
export const UPVOTE_POST = "/post/upvote";
export const DOWNVOTE_POST = "/post/downvote";
export const GET_POSTS_BY_AUTHOR = "/by-author";
export const TRENDS = "/trends";
export const FEED = "/feed";

export const MEMBER = "/member";
export const ADMIN = "/admin";
export const REPORTS = "/reports";
export const ENROLLED_SUBCLUBS = "/enrolled-subclubs";
export const ATTENDED_EVENTS = "/attended-events";
export const PRIVATE_MESSAGE = "/private-message";
export const REQUEST_SUBCLUB= "/request-subclub";

export const LOGIN_WITH_TOKEN = "/auth/login_with_token";

export const SEARCH_MEMBER_BY_NAME = "/admin/search-member"
export const RESET_PASSWORD = "/reset-password";
export const CHANGE_PASSWORD_WITH_TOKEN = "/change-password-token";

