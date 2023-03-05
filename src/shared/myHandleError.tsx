import { AxiosError } from 'axios';
import { Dialog } from 'vant';

export const popupDialog = (errorData: ResourceError) => {
  Dialog.alert({
    title: '出错',
    message: Object.values(errorData.errors).join('\n'),
  });
};

export const myHandleError = (
  error: AxiosError<ResourceError>,
  fn: (errors: ResourceError) => void = popupDialog
) => {
  if (error.response?.status === 422) {
    fn(error.response.data);
  }
  throw error;
};
