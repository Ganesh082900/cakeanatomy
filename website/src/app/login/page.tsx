'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { Button, Input, Card } from '@/cui';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const redirect = searchParams.get('redirect') || '/';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-theme(spacing.20))] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-neutral-600">
              Sign in to your account to continue
            </p>
          </div>

          <Card>
            <Card.Body>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />

                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 mr-2"
                    />
                    <span className="text-neutral-700">Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                >
                  Sign In
                </Button>

                <div className="text-center text-sm text-neutral-600">
                  Don't have an account?{' '}
                  <Link
                    href={`/register${redirect !== '/' ? `?redirect=${redirect}` : ''}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Create one
                  </Link>
                </div>
              </form>
            </Card.Body>
          </Card>

          {/* Demo Credentials */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500 mb-2">Demo Account:</p>
            <p className="text-xs text-neutral-600 font-mono">
              admin@cakeanatomy.com / admin123
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
