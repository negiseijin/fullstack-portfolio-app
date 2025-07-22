import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  subcomponents: {
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A flexible card component for displaying content in a structured way. It consists of a header, content, and footer.',
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              {/* Note: This should be a Select component in a real app */}
              <Input id="framework" placeholder="e.g. Next.js" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A complete example of a card with a header, content containing a form, and a footer with action buttons.',
      },
    },
  },
};
