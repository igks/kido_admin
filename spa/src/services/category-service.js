import * as API from "./http-service";
const baseTarget = "/admin/categories";

export const getAll = async () => {
  let target = `${baseTarget}`;

  const result = await API.get(target);
  return result;
};

export const getOne = async (id) => {
  let target = `${baseTarget}/${id}`;

  const result = await API.get(target);
  return result;
};

export const create = async (formData) => {
  let target = `${baseTarget}`;

  const result = await API.post(target, formData);
  return result;
};

export const update = async (id, formData) => {
  let target = `${baseTarget}/${id}`;

  const result = await API.put(target, formData);
  return result;
};
