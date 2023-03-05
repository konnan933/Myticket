import i18n from 'i18n';
import { toast } from 'react-toastify';

function i18nReduxToast(language, msgType) {
  console.log(i18n.language);
  console.log(msgType);
  if (msgType === 'Success') {
    if (language === 'hu') {
      return toast.success(i18n.t('hu', 'Sikeres feltöltés'));
    } else {
      return toast.success(i18n.t('en', 'Uploaded succesfuly'));
    }
  } else {
    if (language === 'hu') {
      return toast.error(i18n.t('hu', 'Sikertelen feltöltés'));
    } else {
      return toast.error(i18n.t('en', 'Upload failed'));
    }
  }
}
export default i18nReduxToast;
