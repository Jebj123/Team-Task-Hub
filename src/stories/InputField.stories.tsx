import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { fn } from 'storybook/test';
import { InputField } from '../Component/Field/InputField';

const meta = {
  title: 'Fields/InputField',
  component: InputField,
  parameters: { layout: 'centered' },
  tags: ['test'],
  args: { onChange: fn() },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Task Name' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByPlaceholderText('Task Name')).toBeTruthy();
  },
};

export const WithValue: Story = {
  args: { placeholder: 'Task Name', value: 'Sofa' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Task Name') as HTMLInputElement;
    expect(input.value).toBe('Sofa');
  },
};

export const SearchField: Story = {
  args: { placeholder: 'Search...' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByPlaceholderText('Search...')).toBeTruthy();
  },
};

export const Disabled: Story = {
  args: { placeholder: 'Task Name', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Task Name') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  },
};
