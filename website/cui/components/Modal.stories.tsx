import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

const meta = {
  title: 'CUI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = ({ size = 'md' as const, closeOnBackdrop = true, closeOnEsc = true, showCloseButton = true }: {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={size}
        closeOnBackdrop={closeOnBackdrop}
        closeOnEsc={closeOnEsc}
        showCloseButton={showCloseButton}
      >
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <p>This is the modal body content. You can put any content here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWrapper />,
};

export const Small: Story = {
  render: () => <ModalWrapper size="sm" />,
};

export const Large: Story = {
  render: () => <ModalWrapper size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalWrapper size="2xl" />,
};

export const NoCloseButton: Story = {
  render: () => <ModalWrapper showCloseButton={false} />,
};

export const NoBackdropClose: Story = {
  render: () => <ModalWrapper closeOnBackdrop={false} />,
};
