import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.depco.management',
  appName: 'depco-management',
  webDir: 'dist/cap-webview',
  // server: {
  //   androidScheme: 'https'
  // },
  server: {
    url: 'http://192.168.1.7:8200', // ifconfig => en0 -> inet
    cleartext: true
  },
  plugins: {
    CapacitorUpdater: {
      autoUpdate: false,
    }
  }
};

export default config;
