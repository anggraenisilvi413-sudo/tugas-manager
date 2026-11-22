// Type alias + union type
export type Status = 'belum' | 'selesai';

// Interface (berisi tipe primitif: number, string)
export interface Tugas {
  id: number;
  judul: string;
  matkul: string;
  tenggat: string;
  status: Status;
}
