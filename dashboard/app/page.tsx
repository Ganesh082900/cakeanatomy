'use client';

import { useState } from 'react';
import { Button, Card, Input, Modal, Select } from '@/cui';

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-neutral-200 p-6">
        <h2 className="text-2xl font-bold text-primary-600 mb-8">CakeAnatomy</h2>
        <nav className="space-y-2">
          <a href="#" className="block px-4 py-2 rounded-lg bg-primary-50 text-primary-700 font-medium">
            Dashboard
          </a>
          <a href="#" className="block px-4 py-2 rounded-lg text-neutral-600 hover:bg-neutral-50">
            Analytics
          </a>
          <a href="#" className="block px-4 py-2 rounded-lg text-neutral-600 hover:bg-neutral-50">
            Reports
          </a>
          <a href="#" className="block px-4 py-2 rounded-lg text-neutral-600 hover:bg-neutral-50">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Dashboard
          </h1>
          <p className="text-neutral-600">
            Welcome to your CUI-powered dashboard
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <Card.Body>
              <p className="text-sm text-neutral-600 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-neutral-900">2,543</p>
              <p className="text-sm text-success-600 mt-2">↑ 12% from last month</p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <p className="text-sm text-neutral-600 mb-1">Revenue</p>
              <p className="text-3xl font-bold text-neutral-900">$45,231</p>
              <p className="text-sm text-success-600 mt-2">↑ 8% from last month</p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <p className="text-sm text-neutral-600 mb-1">Active Projects</p>
              <p className="text-3xl font-bold text-neutral-900">18</p>
              <p className="text-sm text-warning-600 mt-2">→ No change</p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <p className="text-sm text-neutral-600 mb-1">Completion Rate</p>
              <p className="text-3xl font-bold text-neutral-900">94%</p>
              <p className="text-sm text-success-600 mt-2">↑ 3% from last month</p>
            </Card.Body>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-neutral-900">New user registered</p>
                    <p className="text-sm text-neutral-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-neutral-900">Project completed</p>
                    <p className="text-sm text-neutral-500">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-warning-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-neutral-900">System update available</p>
                    <p className="text-sm text-neutral-500">3 hours ago</p>
                  </div>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button variant="ghost" size="sm">View All Activity</Button>
            </Card.Footer>
          </Card>

          {/* Quick Actions */}
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold">Quick Actions</h3>
            </Card.Header>
            <Card.Body>
              <div className="space-y-3">
                <Input 
                  label="Project Name"
                  placeholder="Enter project name"
                  fullWidth
                />
                <Select
                  label="Category"
                  placeholder="Select category"
                  options={[
                    { value: 'design', label: 'Design' },
                    { value: 'development', label: 'Development' },
                    { value: 'marketing', label: 'Marketing' },
                  ]}
                  fullWidth
                />
                <Button color="primary" fullWidth onClick={() => setModalOpen(true)}>
                  Create New Project
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* CUI Features */}
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold">CUI Design System Features</h3>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">Consistent Design</h4>
                <p className="text-sm text-neutral-600">Unified tokens across all apps</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">Accessibility First</h4>
                <p className="text-sm text-neutral-600">WCAG compliant components</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">Developer Friendly</h4>
                <p className="text-sm text-neutral-600">TypeScript & Storybook ready</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="lg">
        <Modal.Header>Create New Project</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Input 
              label="Project Name"
              placeholder="My Awesome Project"
              fullWidth
            />
            <Input 
              label="Description"
              placeholder="Brief project description"
              fullWidth
            />
            <Select
              label="Team"
              placeholder="Select team"
              options={[
                { value: 'team1', label: 'Design Team' },
                { value: 'team2', label: 'Development Team' },
                { value: 'team3', label: 'Marketing Team' },
              ]}
              fullWidth
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setModalOpen(false)}>
            Create Project
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}
