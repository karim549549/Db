export interface Field {
  name: string;
  type: FieldType;
  required?: boolean;
}

export enum FieldType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Date = "date",
  Array = "array",
  Object = "object",
}

export interface Entity {
  fields: Field[];
  relationships?: {
    name: string;
    type: string;
  }[];
}

export interface Schema {
  entities: Entity[];
}
