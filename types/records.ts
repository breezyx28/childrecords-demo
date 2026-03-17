export type TRecordsFile = {
  created_at: string;
  description: string;
  directory: string;
  filename: string;
  id: number;
  size: string;
  type: "folder";
};

export type TRecordsFiles = TRecordsFile[];

export type TRecordsFolder = {
  id: number;
  type: "folder";
  filename: string;
  description: string;
  directory: string;
  files: number;
  size: string;
  created_at: string;
};

export type TRecordsFolders = TRecordsFolder[];
