'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { Button, Card, Input } from '@/cui';
import { useAuth } from '@/contexts/AuthContext';
import { updateDetails, updatePassword, addAddress, updateAddress, deleteAddress } from '@/lib/services/authService';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'addresses'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Profile form
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Address form
  const [addressForm, setAddressForm] = useState<any>(null);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/profile');
      return;
    }

    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [isAuthenticated, user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const updatedUser = await updateDetails(profileData);
      updateUser(updatedUser);
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      setSuccess('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      let updatedUser;
      if (editingAddressId) {
        updatedUser = await updateAddress(editingAddressId, addressForm);
        setSuccess('Address updated successfully!');
      } else {
        updatedUser = await addAddress(addressForm);
        setSuccess('Address added successfully!');
      }
      updateUser(updatedUser);
      setAddressForm(null);
      setEditingAddressId(null);
    } catch (err: any) {
      setError(err.message || 'Failed to save address');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const updatedUser = await deleteAddress(addressId);
      updateUser(updatedUser);
      setSuccess('Address deleted successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to delete address');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditAddress = (address: any) => {
    setEditingAddressId(address._id);
    setAddressForm({ ...address });
  };

  const startAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
      isDefault: false,
    });
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-8">My Profile</h1>

        {error && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <Card.Body>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary-600 text-white rounded-full mx-auto flex items-center justify-center text-3xl font-bold mb-3">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <h2 className="font-semibold text-lg">{user.name}</h2>
                  <p className="text-sm text-neutral-600">{user.email}</p>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    Profile Details
                  </button>
                  <button
                    onClick={() => setActiveTab('password')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'password'
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    Change Password
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'addresses'
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    Addresses
                  </button>
                </nav>
              </Card.Body>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-bold">Profile Details</h2>
                </Card.Header>
                <Card.Body>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <Input
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      required
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      required
                    />
                    <Button type="submit" color="primary" size="lg" isLoading={isLoading}>
                      Save Changes
                    </Button>
                  </form>
                </Card.Body>
              </Card>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-bold">Change Password</h2>
                </Card.Header>
                <Card.Body>
                  <form onSubmit={handleUpdatePassword} className="space-y-6">
                    <Input
                      label="Current Password"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, currentPassword: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="New Password"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                      required
                      helperText="Minimum 6 characters"
                    />
                    <Input
                      label="Confirm New Password"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                      }
                      required
                    />
                    <Button type="submit" color="primary" size="lg" isLoading={isLoading}>
                      Update Password
                    </Button>
                  </form>
                </Card.Body>
              </Card>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <>
                {!addressForm ? (
                  <Card>
                    <Card.Header>
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Saved Addresses</h2>
                        <Button onClick={startAddAddress}>+ Add New</Button>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      {user.addresses && user.addresses.length > 0 ? (
                        <div className="space-y-4">
                          {user.addresses.map((address) => (
                            <div
                              key={address._id}
                              className="p-4 border border-neutral-200 rounded-lg hover:border-neutral-300"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <p className="font-semibold text-neutral-900">{address.fullName}</p>
                                    {address.isDefault && (
                                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-neutral-600">
                                    {address.addressLine1}
                                    {address.addressLine2 && `, ${address.addressLine2}`}
                                  </p>
                                  <p className="text-sm text-neutral-600">
                                    {address.city}, {address.state} - {address.zipCode}
                                  </p>
                                  <p className="text-sm text-neutral-600">Phone: {address.phone}</p>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => startEditAddress(address)}
                                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAddress(address._id)}
                                    className="text-sm text-error-600 hover:text-error-700 font-medium"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-neutral-600 mb-4">No addresses saved yet</p>
                          <Button onClick={startAddAddress}>Add Your First Address</Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                ) : (
                  <Card>
                    <Card.Header>
                      <h2 className="text-xl font-bold">
                        {editingAddressId ? 'Edit Address' : 'Add New Address'}
                      </h2>
                    </Card.Header>
                    <Card.Body>
                      <form onSubmit={handleSaveAddress} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input
                            label="Full Name"
                            value={addressForm.fullName}
                            onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                            required
                          />
                          <Input
                            label="Phone"
                            type="tel"
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                            required
                          />
                        </div>
                        <Input
                          label="Address Line 1"
                          value={addressForm.addressLine1}
                          onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                          required
                        />
                        <Input
                          label="Address Line 2"
                          value={addressForm.addressLine2}
                          onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                        />
                        <div className="grid md:grid-cols-3 gap-4">
                          <Input
                            label="City"
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                            required
                          />
                          <Input
                            label="State"
                            value={addressForm.state}
                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                            required
                          />
                          <Input
                            label="ZIP Code"
                            value={addressForm.zipCode}
                            onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })}
                            required
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isDefault"
                            checked={addressForm.isDefault}
                            onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                            className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 mr-2"
                          />
                          <label htmlFor="isDefault" className="text-sm text-neutral-700">
                            Set as default address
                          </label>
                        </div>
                        <div className="flex gap-4">
                          <Button type="submit" color="primary" isLoading={isLoading}>
                            {editingAddressId ? 'Update' : 'Save'} Address
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setAddressForm(null);
                              setEditingAddressId(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </Card.Body>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
