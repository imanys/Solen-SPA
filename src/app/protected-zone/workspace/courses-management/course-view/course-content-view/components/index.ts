import { lecturesComponents } from './lectures';
import { modulesComponents } from './modules';

export const components: any[] = [...lecturesComponents, ...modulesComponents];

export * from './lectures';
export * from './modules';
