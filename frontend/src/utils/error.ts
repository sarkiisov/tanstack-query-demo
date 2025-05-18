import { isAxiosError } from "axios";

export const getAxiosError = (error: Error) => {
  if (isAxiosError(error)) {
    return (error.response?.data as { message: string }).message as string;
  } else {
    return null;
  }
};
