import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import { Button } from '../Button';

const meta = {
  title: 'CUI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Body>
        <p>This is a simple card with default styling.</p>
      </Card.Body>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold">Card Title</h3>
      </Card.Header>
      <Card.Body>
        <p>This card includes a header section.</p>
      </Card.Body>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card>
      <Card.Body>
        <h3 className="text-lg font-semibold mb-2">Confirm Action</h3>
        <p className="text-neutral-600">Are you sure you want to proceed?</p>
      </Card.Body>
      <Card.Footer>
        <div className="flex gap-2">
          <Button variant="outline" color="neutral">
            Cancel
          </Button>
          <Button color="primary">Confirm</Button>
        </div>
      </Card.Footer>
    </Card>
  ),
};

export const Complete: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold">Complete Card</h3>
        <p className="text-sm text-neutral-500">With header, body, and footer</p>
      </Card.Header>
      <Card.Body>
        <p className="text-neutral-700">
          This card demonstrates all three sections working together.
          Cards are flexible containers that can be customized for various use cases.
        </p>
      </Card.Body>
      <Card.Footer>
        <Button size="sm" variant="ghost">
          Learn More
        </Button>
      </Card.Footer>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card elevated>
      <Card.Body>
        <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
        <p>This card has an elevated shadow for more prominence.</p>
      </Card.Body>
    </Card>
  ),
};

export const NoBorder: Story = {
  render: () => (
    <Card bordered={false}>
      <Card.Body>
        <h3 className="text-lg font-semibold mb-2">No Border Card</h3>
        <p>This card has no border, relying only on shadow for definition.</p>
      </Card.Body>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Card hoverable>
      <Card.Body>
        <h3 className="text-lg font-semibold mb-2">Hoverable Card</h3>
        <p>Hover over this card to see the effect.</p>
      </Card.Body>
    </Card>
  ),
};
