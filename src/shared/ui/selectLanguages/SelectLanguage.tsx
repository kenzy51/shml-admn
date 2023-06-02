import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { languageOptions } from './const';
import { Language, SelectLanguageProps } from './types';

const { Option } = Select;
const SelectLanguage: React.FC<SelectLanguageProps> = ({ collapsed }:any) => {
  const { i18n } = useTranslation('main');
  const [language, setLanguage] = useState<Language>(i18n.language as Language);

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    setLanguage(i18n.language as Language);
  }, [i18n.language]);

  return (
    <Select
      value={language} 
      style={collapsed ? { width: 70 } : { width: 120 }}
      onChange={handleLanguageChange}
    >
      {languageOptions.map(option => (
        <Option key={option.value} value={option.value}>
          { collapsed ? option.shortTitle : option.title }
        </Option>
      ))}
    </Select>
  );
};
export default SelectLanguage;