import { v4 as uuidv4 } from "uuid";

export const getTimestamp = () => {
  return new Date().toISOString();
};

export const getRandomId = () => {
  return uuidv4();
};
