import { LabVm } from './lab.vm';

export interface LocationVm {
  id: number;
  name: string;
  labs: LabVm[];
}
