import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { fn } from 'storybook/test';
import { SelectField } from '../Component/Field/SelectField';

const meta = {
  title: 'Fields/SelectField',
  component: SelectField,
  parameters: { layout: 'centered' },
  tags: ['test'],
  args: { onChange: fn() },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Importance' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('combobox')).toBeTruthy();
  },
};

export const PreselectedHigh: Story = {
  args: { placeholder: 'Importance', value: 'high' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('High')).toBeTruthy();
  },
};

export const PreselectedMedium: Story = {
  args: { placeholder: 'Importance', value: 'medium' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Medium')).toBeTruthy();
  },
};

export const PreselectedLow: Story = {
  args: { placeholder: 'Importance', value: 'low' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Low')).toBeTruthy();
  },
};
