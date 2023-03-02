import { AxiosError } from "axios";
import { Dialog } from "vant";

export const myHandleError = (error: AxiosError<ResourceError>) => {
  if (error.response?.status === 422) {
    Dialog.alert({
      title: '出错',
      message: Object.values(error.response.data.errors).join('\n'),
    });
  }
  throw error;
};
