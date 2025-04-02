import {
  GET_ALL_TEAMS,
  GET_ALL_DRIVERS,
  GET_DRIVER_BY_ID,
  GET_DRIVER_BY_NAME,
  CLEAN_STATE,
  CLEAN_STATE_NAME,
  SET_FILTERS,
} from "../ActionTypes";
import { applyFilters } from "../../utils/filters";

let initialState = {
  allTeams: [],
  allDrivers: [],
  driversFiltered: [],
  activeFilters: { team: null, source: null, order: null },
  driverById: {},
  driverByName: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TEAMS:
      return {
        ...state,
        allTeams: action.payload,
      };
    case GET_ALL_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        driversFiltered: action.payload,
      };

    case GET_DRIVER_BY_ID:
      return {
        ...state,
        driverById: action.payload,
      };

    case GET_DRIVER_BY_NAME:
      return {
        ...state,
        driverByName: action.payload,
      };

    case CLEAN_STATE:
      return {
        ...state,
        driverById: {},
      };

    case CLEAN_STATE_NAME:
      return {
        ...state,
        driverByName: [],
      };

    case SET_FILTERS: {
      const updatedFilters = { ...state.activeFilters, ...action.payload };
      return {
        ...state,
        activeFilters: updatedFilters,
        driversFiltered: applyFilters({
          allDrivers: state.allDrivers,
          activeFilters: updatedFilters,
        }),
      };
    }

    default:
      return { ...state };
  }
}

export default rootReducer;
