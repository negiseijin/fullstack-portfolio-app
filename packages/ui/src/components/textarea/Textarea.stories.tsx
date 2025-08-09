import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    disabled: false,
    placeholder: 'Type here...',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A versatile textarea component for multi-line text input.',
      },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default textarea. Ready for user input.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled textarea. It is not interactive and cannot be focused.',
      },
    },
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'This is a placeholder for the textarea.',
  },
  parameters: {
    docs: {
      description: {
        story: 'A textarea with a placeholder text to guide the user.',
      },
    },
  },
};
