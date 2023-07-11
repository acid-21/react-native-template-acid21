export interface IEnvironment {
  id: string;
  label: string;
  isDebug: boolean;
  isProductionDefault: boolean;
  isDebugDefault: boolean;
  params: any;
}
export interface IEnvironmentProvider {
  children: React.ReactNode;
  environments: IEnvironment[];
}
export type EnvironmentContextType = {
  environment?: IEnvironment;
  initializing: boolean;
  changeEnvironment: (environment: IEnvironment) => void;
};
