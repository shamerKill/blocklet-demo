import { ReactNode, useContext, useEffect, useState } from 'react';
// @ts-ignore
import { createAuthServiceSessionContext } from '@arcblock/did-connect/lib/Session';
// @ts-ignore
import DidConnect from '@arcblock/did-connect/lib/Connect';

import { useConfig } from '../config';

export const { SessionProvider, SessionContext, SessionConsumer, withSession } = createAuthServiceSessionContext();

export const useSessionContext = () => {
  const info: any = useContext(SessionContext);
  return info;
};

function ComSessionProvider({ children }: { children: ReactNode }) {
  const { config, setConfig } = useConfig();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(config.showConnectModal);
  }, [config.showConnectModal]);
  return (
    <SessionProvider autoLogin={false} autoConnect={false} serviceHost={config.basename}>
      <DidConnect
        popup
        open={open}
        action="login"
        checkFn={() => true}
        onClose={() => setConfig({ showConnectModal: false })}
        onSuccess={() => setConfig({ showConnectModal: false })}
        messages={{
          title: 'login',
          scan: 'Scan QR code with DID Wallet',
          confirm: 'Confirm login on your DID Wallet',
          success: 'You have successfully signed in!',
        }}
      />
      {children}
    </SessionProvider>
  );
}
export default ComSessionProvider;
