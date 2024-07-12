import { createContext, useContext } from 'react';
import { BlockletSDK } from '@blocklet/js-sdk';

export interface Config {
  basename: string;
  blockletSdk: BlockletSDK;
  setConfig: (config: Partial<Config>) => void;
  // 是否显示登录弹窗
  showConnectModal: boolean;
}

export const configDefault: Config = {
  basename: window?.blocklet?.prefix || '/',
  blockletSdk: new BlockletSDK(),
  showConnectModal: false,

  setConfig: () => null,
};

export const ConfigContext = createContext(configDefault);
export const useConfig = () => {
  const { setConfig, ...config } = useContext(ConfigContext);
  return { config, setConfig };
};
