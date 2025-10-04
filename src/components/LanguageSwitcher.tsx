import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleLanguage}>
      <Globe className="h-5 w-5" />
      <span className="sr-only">
        {i18n.language === 'ar' ? 'EN' : 'AR'}
      </span>
    </Button>
  );
};
