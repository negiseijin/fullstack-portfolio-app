import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../input';
import { Label } from './Label';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Renders an accessible label associated with a form control.',
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a label.',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default label style.',
      },
    },
  },
};

export const WithInput: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email" {...args} />
      <Input id="email" placeholder="your@email.com" type="email" />
    </div>
  ),
  args: {
    children: 'Email Address',
  },
  parameters: {
    docs: {
      description: {
        story: 'A label associated with an input field. Clicking the label focuses the input.',
      },
    },
  },
};
