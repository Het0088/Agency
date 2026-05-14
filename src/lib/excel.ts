import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export interface CityData {
  slug: string;
  cityName: string;
  state: string;
  heroTitle?: string;
  heroSub?: string;
  aboutText?: string;
  [key: string]: any;
}

export function getCities(): CityData[] {
  const filePath = path.join(process.cwd(), 'data/cities.xlsx');
  
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  return XLSX.utils.sheet_to_json(worksheet);
}

export function getCityBySlug(slug: string): CityData | undefined {
  const cities = getCities();
  return cities.find(c => c.slug === slug);
}
