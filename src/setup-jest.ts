import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

jest.mock('./environments/environment', () => ({
  environment: {
    production: false,
    enableDebug: true,
    projectKey: 'shop',
    clientId: '123456789',
    clientSecret: '123qweasdzxc',
    authUrl: 'https://auth.example.com',
    apiUrl: 'https://api.example.com',
    scopes: ['shop'],
  },
}));

setupZoneTestEnv();
