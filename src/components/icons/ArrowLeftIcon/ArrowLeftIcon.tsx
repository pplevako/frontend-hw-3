import * as React from 'react';

import type { IconProps } from '../Icon';
import Icon from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      transform="matrix(-1,0,0,1,0,0)"
      width="32"
      height="32"
      {...props}
    >
      <path
        d="M8.90997 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.90997 4.07999"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowDownIcon;
