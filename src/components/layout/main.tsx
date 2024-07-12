import { Typography } from 'antd';
import { ReactNode } from 'react';

function ComLayoutMain({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minWidth: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      {children}
    </div>
  );
}

export default ComLayoutMain;

export const { Title, Text } = Typography;
