import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button';
import { Toaster, toast } from './sonner';

const meta = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A toaster component that displays notifications. It is a wrapper around the `sonner` library.',
      },
    },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

const code = `
import { Button } from '@repo/ui/components/button';
import { Toaster, toast } from '@repo/ui/components/sonner';

<Toaster />
<Button
  onClick={() => {
    toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => {
          console.log('Undo');
        },
      },
    });
  }}
>
  Show Toast
</Button>
`;

export const Default: Story = {
  render: (args) => (
    <div>
      <Toaster {...args} />
      <Button
        onClick={() => {
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => {
                console.log('Undo');
              },
            },
          });
        }}
      >
        Show Toast
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Click the button to display a toast notification. The toast will appear at the bottom right of the screen.',
      },
      source: {
        code: code,
      },
    },
  },
};
