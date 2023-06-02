import React, { ComponentType } from 'react';

interface WithVisibleProps {
  visible?: boolean;
}

export function withVisible<T extends object>(
  WrappedComponent: ComponentType<T>
) {
  type Props = T & WithVisibleProps;

  function Visible({ visible = true, ...props }: Props) {
    if (!visible) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <WrappedComponent {...props} />;
  }

  return Visible;
}
