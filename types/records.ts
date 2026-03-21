export type TRecordsFile = {
  created_at: string;
  description: string;
  directory: string;
  filename: string;
  id: number;
  size: string;
  type: "folder";
  /** Present in mock `files.json` — used for view / copy / download / share without preview API */
  file_url?: string;
  /** e.g. `pdf` | `image` — used for correct inline preview when URL extension is ambiguous */
  file_type?: string;
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
