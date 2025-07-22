import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default button style. Used for primary actions.',
      },
    },
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  parameters: {
    docs: {
      description: {
        story: 'A button for destructive actions, such as deleting data. Use with caution.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  parameters: {
    docs: {
      description: {
        story: 'An outlined button, typically used for secondary actions.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'A secondary button style, less prominent than the default button.',
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  parameters: {
    docs: {
      description: {
        story: 'A ghost button with no background, used for less intrusive actions.',
      },
    },
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
  parameters: {
    docs: {
      description: {
        story: 'A button that looks like a link, useful for navigation actions within text.',
      },
    },
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: (
      <svg
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Icon</title>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'A button that contains only an icon. Ideal for toolbars and compact UIs.',
      },
    },
  },
};
