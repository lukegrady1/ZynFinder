import { useState } from 'react';
import { Store, Product, StoreInventory } from '@/types';
import { Button } from '@/components/ui/button';
import { useFirebase } from '@/lib/contexts/FirebaseContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface StoreInventoryDialogProps {
  store: Store;
  onClose: () => void;
}

const PRODUCT_OPTIONS = [
  { brand: 'ZYN', flavors: ['Mint', 'Wintergreen', 'Coffee', 'Citrus', 'Cinnamon'], strengths: [3, 6] },
  { brand: 'Velo', flavors: ['Mint', 'Citrus', 'Dragon Fruit'], strengths: [2, 4, 7] },
  { brand: 'On!', flavors: ['Mint', 'Coffee', 'Citrus'], strengths: [2, 4, 8] },
];

export default function StoreInventoryDialog({ store, onClose }: StoreInventoryDialogProps) {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedStrength, setSelectedStrength] = useState<number | ''>('');
  const [inStock, setInStock] = useState(true);
  const [quantity, setQuantity] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const { db, auth } = useFirebase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand || !selectedFlavor || !selectedStrength) return;
    if (!auth.currentUser) {
      alert('Please sign in to update inventory');
      return;
    }

    setSubmitting(true);
    try {
      const inventoryRef = collection(db, 'inventory');
      await addDoc(inventoryRef, {
        storeId: store.id,
        productBrand: selectedBrand,
        productFlavor: selectedFlavor,
        productStrength: selectedStrength,
        inStock,
        quantity: quantity || null,
        lastUpdated: serverTimestamp(),
        updatedBy: auth.currentUser.uid,
      });

      onClose();
    } catch (error) {
      console.error('Error updating inventory:', error);
      alert('Failed to update inventory. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedBrandOptions = PRODUCT_OPTIONS.find(p => p.brand === selectedBrand);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Update Inventory</h2>
        <h3 className="text-lg mb-4">{store.name}</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="brand" className="block text-sm font-medium mb-1">Brand</label>
            <select
              id="brand"
              className="w-full p-2 border rounded"
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedFlavor('');
                setSelectedStrength('');
              }}
              required
              aria-label="Select product brand"
            >
              <option value="">Select Brand</option>
              {PRODUCT_OPTIONS.map(product => (
                <option key={product.brand} value={product.brand}>
                  {product.brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="flavor" className="block text-sm font-medium mb-1">Flavor</label>
            <select
              id="flavor"
              className="w-full p-2 border rounded"
              value={selectedFlavor}
              onChange={(e) => setSelectedFlavor(e.target.value)}
              required
              disabled={!selectedBrand}
              aria-label="Select product flavor"
            >
              <option value="">Select Flavor</option>
              {selectedBrandOptions?.flavors.map(flavor => (
                <option key={flavor} value={flavor}>
                  {flavor}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="strength" className="block text-sm font-medium mb-1">Strength</label>
            <select
              id="strength"
              className="w-full p-2 border rounded"
              value={selectedStrength}
              onChange={(e) => setSelectedStrength(Number(e.target.value))}
              required
              disabled={!selectedBrand}
              aria-label="Select product strength"
            >
              <option value="">Select Strength</option>
              {selectedBrandOptions?.strengths.map(strength => (
                <option key={strength} value={strength}>
                  {strength}mg
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Availability</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={inStock}
                  onChange={() => setInStock(true)}
                  className="mr-2"
                />
                In Stock
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!inStock}
                  onChange={() => setInStock(false)}
                  className="mr-2"
                />
                Out of Stock
              </label>
            </div>
          </div>

          {inStock && (
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-1">Quantity (optional)</label>
              <input
                id="quantity"
                type="text"
                className="w-full p-2 border rounded"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g., 'Few left', '10+', etc."
              />
            </div>
          )}

          <div className="flex gap-4 justify-end mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Updating...' : 'Update Inventory'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 