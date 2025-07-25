import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    disabled: false,
    placeholder: 'Type here...',
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
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
        component: 'A standard input field for text, passwords, emails, and more.',
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default input field. Ready for user input.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled input field. It is not interactive and cannot be focused.',
      },
    },
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'This is a placeholder',
  },
  parameters: {
    docs: {
      description: {
        story: 'An input field with a placeholder text to guide the user.',
      },
    },
  },
};
