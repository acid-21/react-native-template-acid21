import {IEnvironment} from '../@types/environment';

export const environments: IEnvironment[] = [
  {
    id: 'dev',
    label: 'Development',
    isDebug: true,
    isProductionDefault: false,
    isDebugDefault: true,
    params: {
      apiUrl: 'https://dev.example.com/api',
    },
  },
  {
    id: 'prod',
    label: 'Production',
    isDebug: false,
    isProductionDefault: true,
    isDebugDefault: false,
    params: {
      apiUrl: 'https://prod.example.com/api',
    },
  },
];
