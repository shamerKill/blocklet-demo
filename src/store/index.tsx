import { ReactNode, useCallback, useMemo, useState } from 'react';
// @ts-ignore
import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';
import { Config, ConfigContext, configDefault } from './config';
import ComSessionProvider from './session';

function StoreProvider({ children }: { children: ReactNode }) {
  const [config, cSetConfig] = useState(configDefault);
  const setConfig: Config['setConfig'] = useCallback(
    (__config) => {
      cSetConfig({ ...config, ...__config });
    },
    [config, cSetConfig],
  );
  const configValue = useMemo(() => {
    return { ...config, setConfig };
  }, [config, setConfig]);
  return (
    <ConfigContext.Provider value={configValue}>
      <LocaleProvider translations={{}}>
        <ComSessionProvider>{children}</ComSessionProvider>
      </LocaleProvider>
    </ConfigContext.Provider>
  );
}

export default StoreProvider;
