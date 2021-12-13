import { definitions } from './index.d';
import { definitions as generatedDefinitions } from './generated.d';
export { parameters, paths, operations, external } from './generated.d'

export interface definitions extends Omit<generatedDefinitions, 'records' | 'extended_user_profiles' | 'categories'> {
  records: Omit<generatedDefinitions['records'], 'measurements'> & {
    measurements: number[];
  };
  extended_user_profiles: Omit<generatedDefinitions['extended_user_profiles'], 'categories' | 'sensors'> & {
    categories: number[];
    sensors: number[];
  };
  categories: Omit<generatedDefinitions['categories'], 'name'> & {
    name:
      | "Temperatur"
      | "CO2"
      | "Luftfeuchtigkeit"
      | "Luftdruck"
      | "Zähler"
      | "Lautstärke"
      | "Helligkeit"
      | "Sonstige";
  };
}
