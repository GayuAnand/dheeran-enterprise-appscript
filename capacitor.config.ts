import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dheeranent.cable',
  appName: 'dheeran-enterprise',
  webDir: 'dist/cap-webview',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorUpdater: {
			autoUpdate: false,
		}
  }
};

export default config;
