export type Item = {
  title: string;
  createdDate: string;
  updatedDate: string;
  status: ItemStatus;
  id: string;
};

export enum ItemStatus {
  DONE = 'Done',
  PENDING = 'Pending',
}
