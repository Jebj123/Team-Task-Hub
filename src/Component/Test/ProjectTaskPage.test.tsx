import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup, within } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { useProjectAndTaskManage } from "../../Shared/components/projectsandTaskManager/projectAndTaskManage";
import ViewProjectDetails from "../../Pages/ProjectTasksPage";

const PROJECT_ID = 1;

const testProject = {
    id: PROJECT_ID,
    textProject: "Test Project",
    completed: false,
    projectImportance: "high",
    extendedTasks: [],
};

const renderPage = () =>
    render(
        <MemoryRouter initialEntries={[`/project/${PROJECT_ID}`]}>
            <Routes>
                <Route path="/project/:projectId" element={<ViewProjectDetails />} />
            </Routes>
        </MemoryRouter>
    );

beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
});

beforeEach(() => {
    useProjectAndTaskManage.setState({ projects: [testProject], tasks: [] });
    window.localStorage.setItem("project", JSON.stringify([testProject]));
    vi.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    window.localStorage.clear();
});

describe("ProjectTaskPage - Add Task", () => {
    it("adds a new task when task name and importance are provided", async () => {
        renderPage();

        const taskInput = screen.getByPlaceholderText(/task name/i);
        fireEvent.change(taskInput, { target: { value: "My New Task" } });

        const importanceLabels = screen.getAllByText(/importance/i);
        const importanceTrigger = importanceLabels
            .map((node) => node.closest("button"))
            .find(Boolean);
        expect(importanceTrigger).toBeTruthy();
        fireEvent.click(importanceTrigger!);

        const highOption = (await screen.findAllByText(/high/i)).find((node) =>
            node.closest("[data-slot=select-item]")
        );
        expect(highOption).toBeTruthy();
        fireEvent.click(highOption!);

        fireEvent.click(screen.getByRole("button", { name: /add task/i }));

        expect(await screen.findByText(/my new task/i)).toBeTruthy();
    });

    it("shows an alert when trying to add a task with no name", async () => {
        renderPage();

        fireEvent.click(screen.getByRole("button", { name: /add task/i }));

        expect(window.alert).toHaveBeenCalledWith("Please enter a task.");
    });

    it("shows an alert when trying to add a task with no importance selected", async () => {
        renderPage();

        const taskInput = screen.getByPlaceholderText(/task name/i);
        fireEvent.change(taskInput, { target: { value: "Task Without Importance" } });

        fireEvent.click(screen.getByRole("button", { name: /add task/i }));

        expect(window.alert).toHaveBeenCalledWith("Please select an importance level.");
    });


    it("clears the task input after successfully adding a task", async () => {
        renderPage();

        const taskInput = screen.getByPlaceholderText(/task name/i);
        fireEvent.change(taskInput, { target: { value: "Clearing Task" } });

        const importanceTrigger = screen
            .getAllByText(/importance/i)
            .map((node) => node.closest("button"))
            .find(Boolean);
        fireEvent.click(importanceTrigger!);

        const lowOption = (await screen.findAllByText(/low/i)).find((node) =>
            node.closest("[data-slot=select-item]")
        );
        expect(lowOption).toBeTruthy();
        fireEvent.click(lowOption!);

        fireEvent.click(screen.getByRole("button", { name: /add task/i }));

        await waitFor(() => {
            expect((taskInput as HTMLInputElement).value).toBe("");
        });
    });

    //404 page test

    it("shows 404 page when projectId does not match any project", () => {
        render(
            <MemoryRouter initialEntries={["/project/999"]}>
                <Routes>
                    <Route path="/project/:projectId" element={<ViewProjectDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/404/i)).toBeTruthy();
    });

    //delete task test

    it("deletes a task when delete button is clicked", async () => {
        const task = {
            taskId: 1,
            projectId: PROJECT_ID,
            textTask: "Task to Delete",
            isCompleted: false,
            taskImportance: "medium",
        };
        useProjectAndTaskManage.setState((state) => ({
            tasks: [...state.tasks, task],
        }));

        renderPage();

        const deleteButton = await screen.findByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.queryByText(/task to delete/i)).toBeNull();
        });
    });

    //sorting test A-Z

    it("sorts tasks alphabetically when task header is clicked", async () => {
        const tasks = [
            {
                taskId: 1,
                projectId: PROJECT_ID,
                textTask: "B Task",
                isCompleted: false,
                taskImportance: "medium",
            },
            {
                taskId: 2,
                projectId: PROJECT_ID,
                textTask: "A Task",
                isCompleted: false,
                taskImportance: "medium",
            },
        ];
        useProjectAndTaskManage.setState((state) => ({
            tasks: [...state.tasks, ...tasks],
        }));

        renderPage();

        const taskHeader = screen.getAllByRole("heading").find(
            (node) => /^tasks$/i.test(node.textContent?.trim() ?? "")
        );
        expect(taskHeader).toBeTruthy();
        fireEvent.click(taskHeader!);

        await waitFor(() => {
            const taskRows = screen.getAllByRole("listitem");
            expect(within(taskRows[0]).getByText(/a task/i)).toBeTruthy();
            expect(within(taskRows[1]).getByText(/b task/i)).toBeTruthy();
        });

        fireEvent.click(taskHeader!);

        await waitFor(() => {
            const taskRows = screen.getAllByRole("listitem");
            expect(within(taskRows[0]).getByText(/b task/i)).toBeTruthy();
            expect(within(taskRows[1]).getByText(/a task/i)).toBeTruthy();
        });
    });

    //sorting test by importance
    
    it("sorts tasks by importance when importance header is clicked", async () => { 
        const tasks = [
            {
                taskId: 1,
                projectId: PROJECT_ID,
                textTask: "Medium Task",
                isCompleted: false,
                taskImportance: "medium",
            },
            {
                taskId: 2,
                projectId: PROJECT_ID,
                textTask: "High Task",
                isCompleted: false,
                taskImportance: "high",
            },
        ];
        useProjectAndTaskManage.setState((state) => ({
            tasks: [...state.tasks, ...tasks],
        }));

        renderPage();

        const importanceHeader = screen.getAllByRole("heading").find(
            (node) => /^importance$/i.test(node.textContent?.trim() ?? "")
        );
        expect(importanceHeader).toBeTruthy();
        fireEvent.click(importanceHeader!);

        await waitFor(() => {
            const taskRows = screen.getAllByRole("listitem");
            expect(within(taskRows[0]).getByText(/high task/i)).toBeTruthy();
            expect(within(taskRows[1]).getByText(/medium task/i)).toBeTruthy();
        });
        
        fireEvent.click(importanceHeader!);

        await waitFor(() => {
            const taskRows = screen.getAllByRole("listitem");
            expect(within(taskRows[0]).getByText(/medium task/i)).toBeTruthy();
            expect(within(taskRows[1]).getByText(/high task/i)).toBeTruthy();
        });
    });

    // sorting test by completion status
    
    it("sorts tasks by completion status when status header is clicked", async () => {  
        const tasks = [
            {
                taskId: 1,
                projectId: PROJECT_ID,
                textTask: "Incomplete Task",
                isCompleted: false,
                taskImportance: "medium",
            },
            {
                taskId: 2,
                projectId: PROJECT_ID,
                textTask: "Completed Task",
                isCompleted: true,
                taskImportance: "medium",
            },
        ];
        useProjectAndTaskManage.setState((state) => ({
            tasks: [...state.tasks, ...tasks],
        }));

        renderPage();

        const statusHeader = screen.getAllByRole("heading").find(
            (node) => /^status$/i.test(node.textContent?.trim() ?? "")
        );
        expect(statusHeader).toBeTruthy();
        fireEvent.click(statusHeader!);

        await waitFor(() => {
            const taskRows = screen.getAllByRole("listitem");
            expect(within(taskRows[0]).getByText(/incomplete task/i)).toBeTruthy();
            expect(within(taskRows[1]).getByText(/completed task/i)).toBeTruthy();
        });
        fireEvent.click(statusHeader!);

        await waitFor(() => {
            const taskRows = screen.getAllByRole("listitem");
            expect(within(taskRows[0]).getByText(/completed task/i)).toBeTruthy();
            expect(within(taskRows[1]).getByText(/incomplete task/i)).toBeTruthy();
        });
    });

    it('toggles task completion status when checkbox is clicked', async () => {
        const task = {
            taskId: 1,
            projectId: PROJECT_ID,
            textTask: "Toggle Completion Task",
            isCompleted: false,
            taskImportance: "medium",
        };
        useProjectAndTaskManage.setState((state) => ({
            tasks: [...state.tasks, task],
        }));

        renderPage();

        expect(await screen.findByText(/toggle completion task/i)).toBeTruthy();

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);

        await waitFor(() => {
            expect(checkbox).toBeChecked();
        });
    });
    
    it('filters tasks when search is submitted', async () => {
        const tasks = [
            {
                taskId: 1,
                projectId: PROJECT_ID,
                textTask: "First Task",
                isCompleted: false,
                taskImportance: "medium",
            },
            {
                taskId: 2,
                projectId: PROJECT_ID,
                textTask: "Second Task",
                isCompleted: false,
                taskImportance: "medium",
            },
        ];
        useProjectAndTaskManage.setState((state) => ({
            tasks: [...state.tasks, ...tasks],
        }));

        renderPage();
        
        expect(await screen.findByText(/first task/i)).toBeTruthy();

        const searchInput = screen.getByPlaceholderText(/^search$/i);
        fireEvent.change(searchInput, { target: { value: "First" } });
        fireEvent.click(screen.getByRole("button", { name: /^search$/i }));
        await waitFor(() => {
            expect(screen.getByText(/first task/i)).toBeTruthy();
            expect(screen.queryByText(/second task/i)).toBeNull();
        });
    });
    it('filters task by importance when importance button is clicked', async () => {
        const tasks = [
            {
                taskId: 1,
                projectId: PROJECT_ID,
                textTask: "High Importance Task",
                isCompleted: false,
                taskImportance: "high",
            },
            {
                taskId: 2,
                projectId: PROJECT_ID,
                textTask: "Medium Importance Task",
                isCompleted: false,
                taskImportance: "medium",
            },    
            {
                taskId: 3,
                projectId: PROJECT_ID,
                textTask: "Low Importance Task",
                isCompleted: false,
                taskImportance: "low",
            },
        ];
        useProjectAndTaskManage.setState((state) => ({
            tasks: [...state.tasks, ...tasks],
        }));

        renderPage();

        expect(await screen.findByText(/high importance task/i)).toBeTruthy();
        expect(screen.getByText(/medium importance task/i)).toBeTruthy();
        expect(screen.getByText(/low importance task/i)).toBeTruthy();
        const filterLabels = screen.getAllByText(/filter by importance/i);
        expect(filterLabels.length).toBeGreaterThan(0);
        const filterSection = filterLabels[0].parentElement;
        expect(filterSection).not.toBeNull();

        const highFilterButton = within(filterSection!).getByRole("button", { name: /high/i });
        const mediumFilterButton = within(filterSection!).getByRole("button", { name: /medium/i });
        const lowFilterButton = within(filterSection!).getByRole("button", { name: /low/i });
        
        fireEvent.click(highFilterButton);
        await waitFor(() => {
            expect(screen.getByText(/high importance task/i)).toBeTruthy();
            expect(screen.queryByText(/medium importance task/i)).toBeNull();
            expect(screen.queryByText(/low importance task/i)).toBeNull();
        });
        fireEvent.click(mediumFilterButton);
        await waitFor(() => {
            expect(screen.getByText(/medium importance task/i)).toBeTruthy();
            expect(screen.queryByText(/high importance task/i)).toBeNull();
            expect(screen.queryByText(/low importance task/i)).toBeNull();
        });
        fireEvent.click(lowFilterButton);
        await waitFor(() => {
            expect(screen.getByText(/low importance task/i)).toBeTruthy();
            expect(screen.queryByText(/high importance task/i)).toBeNull();
            expect(screen.queryByText(/medium importance task/i)).toBeNull();
        });
    });
    it('Calculates and displays task completion percentage correctly', async () => {
        const tasks = [
            {
                taskId: 1,
                projectId: PROJECT_ID,
                textTask: "Completed Task",
                isCompleted: true,
                taskImportance: "medium",
            },
            {
                taskId: 2,
                projectId: PROJECT_ID,
                textTask: "Incomplete Task",
                isCompleted: false,
                taskImportance: "medium",
            },
        ];
        useProjectAndTaskManage.setState((state) => ({
            tasks: [...state.tasks, ...tasks],
        }));

        renderPage();

        expect(await screen.findByText(/completed task/i)).toBeTruthy();
        expect(screen.getByText(/incomplete task/i)).toBeTruthy();

        expect(screen.getByText("1/2")).toBeTruthy();
        expect(screen.getByText("50%")).toBeTruthy();
    });
});
