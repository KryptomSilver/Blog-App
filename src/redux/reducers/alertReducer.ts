import { IAlert, IAlertType } from "../../interfaces/interfaces";
import { ALERT } from "../types";

const alertReducer = (state: IAlert = {}, action: IAlertType): IAlert => {
  switch (action.type) {
    case ALERT:
      return action.payload;
    default:
      return state;
  }
};
export default alertReducer;
