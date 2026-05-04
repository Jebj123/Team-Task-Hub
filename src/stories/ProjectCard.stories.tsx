import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';
import { useProjectAndTaskManage } from '../Shared/components/projectsandTaskManager/projectAndTaskManage';
import { ProjectCard } from '../Pages/ProjectPage';

const meta = {
  title: 'Pages/ProjectCard',
  component: ProjectCard,
  parameters: { layout: 'fullscreen' },
  tags: ['test'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  decorators: [
    (Story) => {
      useProjectAndTaskManage.setState({ projects: [], tasks: [] });
      return <Story />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByPlaceholderText(/project name/i)).toBeTruthy();
  },
};

export const WithProjects: Story = {
  decorators: [
    (Story) => {
      useProjectAndTaskManage.setState({
        projects: [
          { id: 1, textProject: 'Lesa Bók', completed: false, projectImportance: 'high',   extendedTasks: [] },
          { id: 2, textProject: 'Skrifa kóða',   completed: true,  projectImportance: 'medium', extendedTasks: [] },
          { id: 3, textProject: 'Fara að sofa',       completed: false, projectImportance: 'low',    extendedTasks: [] },
        ],
        tasks: [],
      });
      return <Story />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/lesa bók/i)).toBeTruthy();
    expect(canvas.getByText(/skrifa kóða/i)).toBeTruthy();
    expect(canvas.getByText(/fara að sofa/i)).toBeTruthy();
  },
};

export const AllCompleted: Story = {
  decorators: [
    (Story) => {
      useProjectAndTaskManage.setState({
        projects: [
          { id: 1, textProject: 'Lesa Bók', completed: true, projectImportance: 'high',   extendedTasks: [] },
          { id: 2, textProject: 'Skrifa kóða',          completed: true, projectImportance: 'medium', extendedTasks: [] },
        ],
        tasks: [],
      });
      return <Story />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/lesa bók/i)).toBeTruthy();
    expect(canvas.getByText(/skrifa kóða/i)).toBeTruthy();
  },
};
