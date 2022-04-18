import * as API from "./http-service";
const baseTarget = "/admin";

export const getTraffic = async () => {
  let target = `${baseTarget}/logs`;

  const result = await API.get(target);
  return result;
};

export const getTop = async () => {
  let target = `${baseTarget}/top`;

  const result = await API.get(target);
  return result;
};
