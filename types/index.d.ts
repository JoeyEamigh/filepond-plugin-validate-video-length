// @ts-ignore
import { FilePondOptions } from 'filepond';

declare module 'filepond' {
  export interface FilePondOptions {
    allowVideoLengthValidation?: boolean;
    maxVideoLength?: number;
    minVideoLength?: number;
  }
}
