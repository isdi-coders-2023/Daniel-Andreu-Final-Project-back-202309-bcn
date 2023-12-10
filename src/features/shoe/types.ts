import { type Request } from "express";
export interface ShoeDataStructure {
  title: string;
  image: string;
  price: number;
  size: number;
  brand: string;
  shoeStatus: string;
  description: string;
  isBoxIncluded: boolean;
  isChangesAccepted: boolean;
  name: string;
  phone: string;
  location: string;
}

export interface ShoeStructure extends ShoeDataStructure {
  _id: string;
}

export type ShoeCreateRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  ShoeDataStructure
>;
