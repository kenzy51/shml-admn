import { ReactNode } from 'react';

export enum Language {
  English = 'en',
  Russian = 'ru',
  Kazakh = 'kz'
}

export interface SelectLanguageProps {
  children?: ReactNode;
  collapsed?: boolean;
}