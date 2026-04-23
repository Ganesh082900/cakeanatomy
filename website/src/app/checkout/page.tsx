'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { Button, Card, Input, Radio, Select } from '@/cui';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { createOrder, CreateOrderData } from '@/lib/services/orderService';
import { addAddress } from '@/lib/services/authService';

type PaymentMethod = 'upi' | 'card' | 'cod';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { user, isAuthenticated, updateUser } = useAuth();

  const [step, setStep] = useState<'address' | 'payment' | 'review'>('address');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Address State
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
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

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
      return;
    }

    if (!cart || cart.items.length === 0) {
      router.push('/cart');
      return;
    }

    // Set default address if available
    if (user?.addresses && user.addresses.length > 0) {
      const defaultAddr = user.addresses.find((addr) => addr.isDefault);
      setSelectedAddress(defaultAddr?._id || user.addresses[0]._id);
    } else {
      setShowAddressForm(true);
    }
  }, [isAuthenticated, cart, user]);

  const handleAddAddress = async () => {
    try {
      setIsProcessing(true);
      const updatedUser = await addAddress(newAddress);
      updateUser(updatedUser);
      setShowAddressForm(false);
      // Select the newly added address
      const newAddrId = updatedUser.addresses[updatedUser.addresses.length - 1]._id;
      setSelectedAddress(newAddrId);
    } catch (error: any) {
      setError(error.message || 'Failed to add address');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!cart || !selectedAddress) return;

    setIsProcessing(true);
    setError('');

    try {
      // Get selected address details
      const address = user?.addresses?.find((addr) => addr._id === selectedAddress);
      if (!address) throw new Error('Please select a delivery address');

      // Prepare order data
      const orderData: CreateOrderData = {
        shippingAddress: {
          fullName: address.fullName,
          phone: address.phone,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2 || '',
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          country: address.country,
        },
        paymentMethod,
      };

      // Create order
      const order = await createOrder(orderData);

      // Simulate payment processing
      if (paymentMethod === 'upi') {
        // In production, integrate with UPI payment gateway
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else if (paymentMethod === 'card') {
        // In production, integrate with card payment gateway (Razorpay, Stripe, etc.)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // Clear cart after successful order
      await clearCart();

      // Redirect to success page
      router.push(`/orders/${order._id}?success=true`);
    } catch (error: any) {
      setError(error.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cart || !user) {
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
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-8">Checkout</h1>

        {error && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {['address', 'payment', 'review'].map((s, idx) => (
              <React.Fragment key={s}>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step === s
                        ? 'bg-primary-600 text-white'
                        : idx < ['address', 'payment', 'review'].indexOf(step)
                        ? 'bg-success-600 text-white'
                        : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="ml-3 text-sm font-medium capitalize hidden sm:inline">{s}</span>
                </div>
                {idx < 2 && <div className="w-16 h-0.5 bg-neutral-200" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Section */}
            {step === 'address' && (
              <Card>
                <Card.Header>
                  <h2 className="text-xl font-bold">Delivery Address</h2>
                </Card.Header>
                <Card.Body>
                  {!showAddressForm ? (
                    <>
                      <div className="space-y-4 mb-6">
                        {user.addresses?.map((address) => (
                          <div
                            key={address._id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              selectedAddress === address._id
                                ? 'border-primary-600 bg-primary-50'
                                : 'border-neutral-200 hover:border-neutral-300'
                            }`}
                            onClick={() => setSelectedAddress(address._id)}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-semibold text-neutral-900">{address.fullName}</p>
                                <p className="text-sm text-neutral-600 mt-1">
                                  {address.addressLine1}
                                  {address.addressLine2 && `, ${address.addressLine2}`}
                                </p>
                                <p className="text-sm text-neutral-600">
                                  {address.city}, {address.state} - {address.zipCode}
                                </p>
                                <p className="text-sm text-neutral-600">Phone: {address.phone}</p>
                              </div>
                              {address.isDefault && (
                                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" onClick={() => setShowAddressForm(true)}>
                        + Add New Address
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          label="Full Name"
                          value={newAddress.fullName}
                          onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                          required
                        />
                        <Input
                          label="Phone"
                          type="tel"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          required
                        />
                      </div>
                      <Input
                        label="Address Line 1"
                        value={newAddress.addressLine1}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                        required
                      />
                      <Input
                        label="Address Line 2"
                        value={newAddress.addressLine2}
                        onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                      />
                      <div className="grid md:grid-cols-3 gap-4">
                        <Input
                          label="City"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          required
                        />
                        <Input
                          label="State"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          required
                        />
                        <Input
                          label="ZIP Code"
                          value={newAddress.zipCode}
                          onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isDefault"
                          checked={newAddress.isDefault}
                          onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                          className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 mr-2"
                        />
                        <label htmlFor="isDefault" className="text-sm text-neutral-700">
                          Set as default address
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <Button onClick={handleAddAddress} isLoading={isProcessing}>
                          Save Address
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowAddressForm(false)}
                          disabled={!user.addresses || user.addresses.length === 0}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {!showAddressForm && selectedAddress && (
                    <div className="mt-6 pt-6 border-t">
                      <Button color="primary" size="lg" onClick={() => setStep('payment')} fullWidth>
                        Continue to Payment
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}

            {/* Payment Section */}
            {step === 'payment' && (
              <Card>
                <Card.Header>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Payment Method</h2>
                    <button
                      onClick={() => setStep('address')}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      ← Back
                    </button>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="space-y-6">
                    {/* UPI */}
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer ${
                        paymentMethod === 'upi' ? 'border-primary-600 bg-primary-50' : 'border-neutral-200'
                      }`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">💳</span>
                          </div>
                          <div>
                            <p className="font-semibold">UPI Payment</p>
                            <p className="text-sm text-neutral-600">Pay using any UPI app</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="text-primary-600"
                        />
                      </div>
                      {paymentMethod === 'upi' && (
                        <Input
                          label="UPI ID"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                          helperText="e.g., yourname@paytm, yourname@gpay"
                        />
                      )}
                    </div>

                    {/* Card */}
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer ${
                        paymentMethod === 'card' ? 'border-primary-600 bg-primary-50' : 'border-neutral-200'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">💳</span>
                          </div>
                          <div>
                            <p className="font-semibold">Credit / Debit Card</p>
                            <p className="text-sm text-neutral-600">Visa, Mastercard, RuPay</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="text-primary-600"
                        />
                      </div>
                      {paymentMethod === 'card' && (
                        <div className="space-y-4">
                          <Input
                            label="Card Number"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                          <Input
                            label="Cardholder Name"
                            value={cardDetails.name}
                            onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            placeholder="JOHN DOE"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              label="Expiry (MM/YY)"
                              value={cardDetails.expiry}
                              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                              placeholder="12/25"
                              maxLength={5}
                            />
                            <Input
                              label="CVV"
                              type="password"
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                              placeholder="123"
                              maxLength={3}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* COD */}
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer ${
                        paymentMethod === 'cod' ? 'border-primary-600 bg-primary-50' : 'border-neutral-200'
                      }`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">💵</span>
                          </div>
                          <div>
                            <p className="font-semibold">Cash on Delivery</p>
                            <p className="text-sm text-neutral-600">Pay when you receive</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="text-primary-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button color="primary" size="lg" onClick={() => setStep('review')} fullWidth>
                      Continue to Review
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Review Section */}
            {step === 'review' && (
              <Card>
                <Card.Header>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Review Order</h2>
                    <button
                      onClick={() => setStep('payment')}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      ← Back
                    </button>
                  </div>
                </Card.Header>
                <Card.Body>
                  {/* Delivery Address */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Delivery Address</h3>
                    {(() => {
                      const address = user.addresses?.find((addr) => addr._id === selectedAddress);
                      return address ? (
                        <div className="bg-neutral-50 p-4 rounded-lg">
                          <p className="font-medium">{address.fullName}</p>
                          <p className="text-sm text-neutral-600 mt-1">
                            {address.addressLine1}
                            {address.addressLine2 && `, ${address.addressLine2}`}
                          </p>
                          <p className="text-sm text-neutral-600">
                            {address.city}, {address.state} - {address.zipCode}
                          </p>
                          <p className="text-sm text-neutral-600">Phone: {address.phone}</p>
                        </div>
                      ) : null;
                    })()}
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Payment Method</h3>
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <p className="capitalize font-medium">
                        {paymentMethod === 'upi'
                          ? 'UPI Payment'
                          : paymentMethod === 'card'
                          ? 'Credit/Debit Card'
                          : 'Cash on Delivery'}
                      </p>
                      {paymentMethod === 'upi' && upiId && (
                        <p className="text-sm text-neutral-600 mt-1">{upiId}</p>
                      )}
                      {paymentMethod === 'card' && cardDetails.number && (
                        <p className="text-sm text-neutral-600 mt-1">
                          **** **** **** {cardDetails.number.slice(-4)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {cart.items.map((item) => (
                        <div key={item._id} className="flex gap-4 bg-neutral-50 p-4 rounded-lg">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                            <Image
                              src={item.product.images[0] || '/placeholder.jpg'}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-neutral-900">{item.product.name}</p>
                            <p className="text-sm text-neutral-600">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{item.subtotal.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    color="primary"
                    size="xl"
                    fullWidth
                    onClick={handlePlaceOrder}
                    isLoading={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Place Order (₹${cart.total.toFixed(2)})`}
                  </Button>
                </Card.Body>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <Card.Header>
                <h2 className="text-xl font-bold">Order Summary</h2>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Items ({cart.totalItems})</span>
                      <span className="font-medium">₹{cart.subtotal.toFixed(2)}</span>
                    </div>
                    {cart.discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Discount</span>
                        <span className="font-medium text-success-600">-₹{cart.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Tax (GST)</span>
                      <span className="font-medium">₹{cart.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Delivery</span>
                      <span className="font-medium text-success-600">
                        {cart.subtotal >= 1000 ? 'FREE' : '₹50'}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-primary-600">
                        ₹{cart.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {cart.subtotal < 1000 && (
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 text-sm">
                      <p className="text-primary-700">
                        Add ₹{(1000 - cart.subtotal).toFixed(2)} more for FREE delivery
                      </p>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
