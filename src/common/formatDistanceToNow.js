import { formatDistanceToNow } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

const locales = { enUS, ru };

export default (date, options) => formatDistanceToNow(date, {
  locale: locales[window.navigator.language],
  addSuffix: true,
  ...options,
});
