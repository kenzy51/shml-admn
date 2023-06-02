import { Button } from 'antd';
import React, { ReactNode } from 'react';
interface AntButtonProps {
  type:string | any;
  children: ReactNode;
  danger: any;
}

export const AntButton = ({children,type,danger }:AntButtonProps) => {
  return (
    <Button type={type} danger={danger}>
      {children}
    </Button>
  );
};
