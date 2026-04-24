'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from '@/cui';
import { inventoryService } from '@/lib/services/inventory';

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await inventoryService.getAllMaterials();
        setMaterials(response.data);
      } catch (error) {
        console.error('Failed to fetch materials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-success-100 text-success-700';
      case 'low-stock': return 'bg-warning-100 text-warning-700';
      case 'out-of-stock': return 'bg-error-100 text-error-700';
      case 'expiring-soon': return 'bg-warning-100 text-warning-700';
      case 'expired': return 'bg-error-100 text-error-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <Card.Body>
            <p className="text-sm text-neutral-600">Total Materials</p>
            <p className="text-3xl font-bold text-neutral-900 mt-1">{materials.length}</p>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <p className="text-sm text-neutral-600">Low Stock</p>
            <p className="text-3xl font-bold text-warning-600 mt-1">
              {materials.filter(m => m.status === 'low-stock').length}
            </p>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <p className="text-sm text-neutral-600">Out of Stock</p>
            <p className="text-3xl font-bold text-error-600 mt-1">
              {materials.filter(m => m.status === 'out-of-stock').length}
            </p>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <p className="text-sm text-neutral-600">Expiring Soon</p>
            <p className="text-3xl font-bold text-warning-600 mt-1">
              {materials.filter(m => m.status === 'expiring-soon' || m.status === 'expired').length}
            </p>
          </Card.Body>
        </Card>
      </div>

      {/* Materials Table */}
      <Card>
        <Card.Header>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Raw Materials Inventory</h2>
            <Button variant="solid" color="primary">Add Material</Button>
          </div>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-12 text-neutral-500">Loading materials...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Material</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Stock</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Min Level</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Value</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Expiry</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((material) => (
                    <tr key={material._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900">
                        {material.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600 capitalize">
                        {material.category}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-900">
                        {material.currentStock} {material.unit}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {material.minStockLevel} {material.unit}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900">
                        ₹{material.totalValue?.toFixed(0)}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {material.expiryDate 
                          ? new Date(material.expiryDate).toLocaleDateString()
                          : '-'
                        }
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(material.status)}`}>
                          {material.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
