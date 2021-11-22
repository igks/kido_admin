import * as API from "./http-service";
const baseTarget = "/auth";

export const login = async (formData) => {
  let target = `${baseTarget}/login`;

  const result = await API.post(target, formData);
  return result;
};
