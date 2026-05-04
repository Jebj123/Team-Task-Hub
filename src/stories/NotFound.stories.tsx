import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import NotFound from '../Pages/404';

const meta = {
  title: 'Pages/NotFound',
  component: NotFound,
  parameters: { layout: 'fullscreen' },
  tags: ['test'],
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/404 - page not found/i)).toBeTruthy();
  },
};
