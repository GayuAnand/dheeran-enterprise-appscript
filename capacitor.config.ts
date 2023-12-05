import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.depco.management',
  appName: 'depco-management',
  webDir: 'dist/cap-webview',
  server: {
    androidScheme: 'https'
  },
  // server: {
  //   url: 'http://192.168.1.7:4200',
  //   cleartext: true
  // },
  plugins: {
    CapacitorUpdater: {
			autoUpdate: false,
		}
  }
};

export default config;
