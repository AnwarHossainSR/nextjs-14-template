import type { FC } from 'react';

import type { ChildrenProps } from '@/types';

const Header: FC<ChildrenProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Header;
