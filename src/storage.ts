// Generics sederhana: kelas ini bisa menyimpan array bertipe apa saja (T)
export class Penyimpanan<T> {
  constructor(private kunci: string) {}

  muat(): T[] {
    try {
      return JSON.parse(localStorage.getItem(this.kunci) ?? '[]') as T[];
    } catch {
      return [];
    }
  }

  simpan(data: T[]): void {
    localStorage.setItem(this.kunci, JSON.stringify(data));
  }
}
