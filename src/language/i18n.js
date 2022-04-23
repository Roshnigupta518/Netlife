
import I18n from 'i18n-js';
import en from './English';
import it from './Italian';

I18n.fallbacks = true;
I18n.locale = 'it';

I18n.translations = {
  en,
  it,
};

export default I18n;