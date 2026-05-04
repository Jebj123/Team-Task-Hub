import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useProjectAndTaskManage } from '../Shared/components/projectsandTaskManager/projectAndTaskManage';
import ViewProjectDetails from '../Pages/ProjectTasksPage';

const project = {
  id: 1,
  textProject: 'Build landing page',
  completed: false,
  projectImportance: 'high',
  extendedTasks: [],
};

const meta = {
  title: 'Pages/ViewProjectDetails',
  component: ViewProjectDetails,
  parameters: { layout: 'fullscreen' },
  tags: ['test'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/project/1']}>
        <Routes>
          <Route path="/project/:projectId" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ViewProjectDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoTasks: Story = {
  decorators: [
    (Story) => {
      useProjectAndTaskManage.setState({ projects: [project], tasks: [] });
      return <Story />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByPlaceholderText(/task name/i)).toBeTruthy();
  },
};

export const WithTasks: Story = {
  decorators: [
    (Story) => {
      useProjectAndTaskManage.setState({
        projects: [project],
        tasks: [
          { taskId: 1, projectId: 1, textTask: 'Hlaða síma',    taskImportance: 'high',   isCompleted: true  },
          { taskId: 2, projectId: 1, textTask: 'Skrifa kóða',    taskImportance: 'medium', isCompleted: false },
          { taskId: 3, projectId: 1, textTask: 'Borða',       taskImportance: 'low',    isCompleted: false },
          { taskId: 4, projectId: 1, textTask: 'sofa', taskImportance: 'high',   isCompleted: false },
        ],
      });
      return <Story />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/hlaða síma/i)).toBeTruthy();
    expect(canvas.getByText(/skrifa kóða/i)).toBeTruthy();
    expect(canvas.getByText(/borða/i)).toBeTruthy();
    expect(canvas.getByText(/sofa/i)).toBeTruthy();
  },
};

export const AllTasksCompleted: Story = {
  decorators: [
    (Story) => {
      useProjectAndTaskManage.setState({
        projects: [{ ...project, completed: true }],
        tasks: [
          { taskId: 1, projectId: 1, textTask: 'Hlaða síma', taskImportance: 'high',   isCompleted: true },
          { taskId: 2, projectId: 1, textTask: 'Skrifa kóða', taskImportance: 'medium', isCompleted: true },
        ],
      });
      return <Story />;
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/good job/i)).toBeTruthy();
  },
};
