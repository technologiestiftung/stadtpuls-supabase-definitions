import { definitions } from './index.d';
import { definitions as generatedDefinitions } from './generated.d';
export { parameters, paths, operations, external } from './generated.d'

export interface definitions extends Omit<generatedDefinitions, 'records' | 'extended_user_profiles'> {
  records: Omit<generatedDefinitions['records'], 'measurements'> & {
    measurements: number[];
  };
  extended_user_profiles: Omit<generatedDefinitions['extended_user_profiles'], 'categories' | 'sensors'> & {
    categories: number[];
    sensors: number[];
  };
}
