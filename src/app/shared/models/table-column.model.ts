export type ColumnType = 'text' | 'avatar' | 'tag' | 'date' | 'color';

export interface TableColumn {
  field: string;
  header: string;
  type?: ColumnType;
  sortable?: boolean;

  imageField?: string;
}
