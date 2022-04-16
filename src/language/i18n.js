
import I18n from 'i18n-js';
import en from './English';
import sp from './Spanish';

I18n.fallbacks = true;
I18n.locale = 'en';

I18n.translations = {
  en,
  sp,
};

export default I18n;