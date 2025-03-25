export interface Store {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  lastUpdated: Date;
  inventory?: {
    [productId: string]: {
      quantity: number;
      lastUpdated: Date;
    };
  };
}

export interface Product {
  id: string;
  brand: string;
  flavor: string;
  strength: number;
  type: string;
}

export interface StoreInventory {
  storeId: string;
  productId: string;
  inStock: boolean;
  lastUpdated: Date;
  updatedBy: string;
  quantity?: string; // Optional field for quantity information
}

export interface UserLocation {
  lat: number;
  lng: number;
} 