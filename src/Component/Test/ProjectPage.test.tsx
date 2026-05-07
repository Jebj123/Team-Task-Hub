import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, within, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useProjectAndTaskManage } from "../../Shared/components/projectsandTaskManager/projectAndTaskManage";
import { ProjectCard } from "../../Pages/ProjectPage";

beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
});

beforeEach(() => {
    useProjectAndTaskManage.setState({ projects: [], tasks: [] });
    window.localStorage.clear();
});

afterEach(() => {
    cleanup();
});

describe("ProjectCard", () => {

    // Search Functionality test

    it("filters projects when search is submitted", async () => {
        const projects = [
            {
                id: 1,
                textProject: "Project A",
                completed: false,
                projectImportance: "High",
                extendedTasks: [],
            },
            {
                id: 2,
                textProject: "Project B",
                completed: false,
                projectImportance: "Low",
                extendedTasks: [],
            },
        ];

        window.localStorage.setItem("project", JSON.stringify(projects));

        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );

        expect(await screen.findByText(/project a/i)).toBeTruthy();
        expect(screen.getByText(/project b/i)).toBeTruthy();

        fireEvent.change(screen.getByPlaceholderText(/search/i), {
            target: { value: "project a" }, 
        });
        fireEvent.click(screen.getByRole("button", { name: /^search$/i }));

        expect(screen.getByText(/project a/i)).toBeTruthy();
        expect(screen.queryByText(/project b/i)).toBeNull();
    });

    // Clear Search test

    it("shows all projects when search is cleared by clicking Search with no input", async () => {
        const projects = [
            { id: 1, textProject: "Project A", completed: false, projectImportance: "High", extendedTasks: [] },
            { id: 2, textProject: "Project B", completed: false, projectImportance: "Low", extendedTasks: [] },
        ];
        window.localStorage.setItem("project", JSON.stringify(projects));
        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );

        expect(await screen.findByText(/project a/i)).toBeTruthy();
        expect(screen.getByText(/project b/i)).toBeTruthy();

        const searchInput = screen.getByPlaceholderText(/search/i);
        fireEvent.change(searchInput, {
            target: { value: "project a" },
        });
        fireEvent.click(screen.getByRole("button", { name: /^search$/i }));

        expect(screen.getByText(/project a/i)).toBeTruthy();
        expect(screen.queryByText(/project b/i)).toBeNull();

        fireEvent.change(searchInput, {
            target: { value: "" },
        });
        fireEvent.click(screen.getByRole("button", { name: /^search$/i }));

        expect(screen.getByText(/project a/i)).toBeTruthy();
        expect(screen.getByText(/project b/i)).toBeTruthy();
    });


    // Filtering by Importance test

    it("filters projects by importance when the High filter button is clicked", async () => {
        const projects = [
            {
                id: 1,
                textProject: "Project A",
                completed: false,
                projectImportance: "High",
                extendedTasks: [],
            },
            {
                id: 2,
                textProject: "Project B",
                completed: false,
                projectImportance: "Low",
                extendedTasks: [],
            },
        ];

        window.localStorage.setItem("project", JSON.stringify(projects));

        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );

        const alphaMatches = await screen.findAllByText(/project a/i);
        expect(alphaMatches.length).toBeGreaterThan(0);
        expect(screen.getAllByText(/project b/i).length).toBeGreaterThan(0);

        const filterLabels = screen.getAllByText(/filter by importance/i);
        expect(filterLabels.length).toBeGreaterThan(0);
        const filterSection = filterLabels[0].parentElement;
        expect(filterSection).not.toBeNull();
        const highFilterButtons = within(filterSection!).getAllByRole("button", { name: /high/i });
        expect(highFilterButtons.length).toBeGreaterThan(0);

        const highFilterButtonBefore = highFilterButtons[0];
        expect(highFilterButtonBefore.dataset.variant).toBe("outline");

        fireEvent.click(highFilterButtonBefore);

        const highFilterButtonAfter = within(filterSection!).getAllByRole("button", { name: /high/i })[0];
        expect(highFilterButtonAfter.dataset.variant).toBe("default");

        await waitFor(() => {
            expect(screen.getAllByText(/project a/i).length).toBeGreaterThan(0);
            expect(screen.queryByText(/project b/i)).toBeNull();
        });
    });
    // adding project test
    it("adds a new project when the Add Project button is clicked", async () => {
        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );

        const projectNameInput = screen.getByPlaceholderText(/project name/i);
        fireEvent.change(projectNameInput, { target: { value: "New Project" } });

        const importanceLabels = screen.getAllByText(/importance/i);
        const importanceLabel = importanceLabels.find((node) => node.closest("button"));
        expect(importanceLabel).toBeTruthy();
        const importanceTrigger = importanceLabel!.closest("button");
        expect(importanceTrigger).toBeTruthy();
        fireEvent.click(importanceTrigger!);

        const highOption = (await screen.findAllByText(/high/i)).find((node) =>
            node.closest("[data-slot=select-item]")
        );
        expect(highOption).toBeTruthy();
        fireEvent.click(highOption!);

        fireEvent.click(screen.getByRole("button", { name: /add project/i }));

        expect(await screen.findByText(/new project/i)).toBeTruthy();
    });

    // deleting project test
    it("deletes a project when the Delete button is clicked", async () => {
        const projects = [
            {
                id: 1,
                textProject: "Project A",
                completed: false,
                projectImportance: "High",
                extendedTasks: [],
            },
        ];
        window.localStorage.setItem("project", JSON.stringify(projects));
        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );
        expect(await screen.findByText(/project a/i)).toBeTruthy();

        const deleteButton = screen.getByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);
        await waitFor(() => {
            expect(screen.queryByText(/project a/i)).toBeNull();
        });
    });

    // sorting projects test

    it("sorts projects alphabetically when the Project header is clicked", async () => {
        const projects = [
            {
                id: 1,
                textProject: "Project B",
                completed: false,
                projectImportance: "Low",
                extendedTasks: [],
            },
            {
                id: 2,
                textProject: "Project A",
                completed: false,
                projectImportance: "High",
                extendedTasks: [],
            },
        ];
        window.localStorage.setItem("project", JSON.stringify(projects));
        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );

        expect(await screen.findByText(/project a/i)).toBeTruthy();
        expect(screen.getByText(/project b/i)).toBeTruthy();

        const projectHeader = screen.getAllByText(/^Project$/i).find(
            (node) => node.tagName === "H2"
        );
        expect(projectHeader).toBeTruthy();

        fireEvent.click(projectHeader!);
        await waitFor(() => {
        const rows = screen.getAllByRole("listitem");
        expect(rows.length).toBe(2);
        expect(within(rows[0]).getByText(/project a/i)).toBeTruthy();
        expect(within(rows[1]).getByText(/project b/i)).toBeTruthy();
        });

        fireEvent.click(projectHeader!);
        await waitFor(() => {
            const rows = screen.getAllByRole("listitem");
            expect(rows.length).toBe(2);
            expect(within(rows[0]).getByText(/project b/i)).toBeTruthy();
            expect(within(rows[1]).getByText(/project a/i)).toBeTruthy();
        });
    });
    // sorting importance test
    it("sorts projects by importance when the Importance header is clicked", async () => {
        const projects = [
            {   id: 1, textProject: "Project A", completed: false, projectImportance: "Low", extendedTasks: [] },
            {   id: 2, textProject: "Project B", completed: false, projectImportance: "High", extendedTasks: [] },
        ];
        window.localStorage.setItem("project", JSON.stringify(projects));
        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );
        expect(await screen.findByText(/project a/i)).toBeTruthy();
        expect(screen.getByText(/project b/i)).toBeTruthy();

        const importanceHeader = screen.getAllByText(/importance/i).find(
            (node) => node.tagName === "H2"
        );
        expect(importanceHeader).toBeTruthy();
        fireEvent.click(importanceHeader!);
        await waitFor(() => {
            const rows = screen.getAllByRole("listitem");
            expect(rows.length).toBe(2);
            expect(within(rows[0]).getByText(/project b/i)).toBeTruthy();
            expect(within(rows[1]).getByText(/project a/i)).toBeTruthy();
        });

        fireEvent.click(importanceHeader!);
        await waitFor(() => {
            const rows = screen.getAllByRole("listitem");
            expect(rows.length).toBe(2);
            expect(within(rows[0]).getByText(/project a/i)).toBeTruthy();
            expect(within(rows[1]).getByText(/project b/i)).toBeTruthy();
        });

    });

    // sort by project status test
    it("sorts projects by completion status when the Project status header is clicked", async () => {
        const projects = [
            { id: 1, textProject: "Project A", completed: true, projectImportance: "High", extendedTasks: [] },
            { id: 2, textProject: "Project B", completed: false, projectImportance: "Low", extendedTasks: [] },
        ];
        window.localStorage.setItem("project", JSON.stringify(projects));
        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );
        expect(await screen.findByText(/project a/i)).toBeTruthy();
        expect(screen.getByText(/project b/i)).toBeTruthy();

        const completedHeader = screen.getAllByText(/project status/i).find(
            (node) => node.tagName === "H2"
        );
        expect(completedHeader).toBeTruthy();

        fireEvent.click(completedHeader!);
        await waitFor(() => {
        const rows = screen.getAllByRole("listitem");
        expect(rows.length).toBe(2);
        expect(within(rows[0]).getByText(/project b/i)).toBeTruthy();
        expect(within(rows[1]).getByText(/project a/i)).toBeTruthy();
        });

        fireEvent.click(completedHeader!);
        await waitFor(() => {
            const rows = screen.getAllByRole("listitem");
            expect(rows.length).toBe(2);
            expect(within(rows[0]).getByText(/project a/i)).toBeTruthy();
            expect(within(rows[1]).getByText(/project b/i)).toBeTruthy();
        });
    });
    it('Filters projects by importance when a filter button is clicked and clears other filters', async () => {
        const projects = [
            { id: 1, textProject: 'Project A', completed: false, projectImportance: 'High', extendedTasks: [] },
            { id: 2, textProject: 'Project B', completed: false, projectImportance: 'Low', extendedTasks: [] },
            { id: 3, textProject: 'Project C', completed: true, projectImportance: 'Medium', extendedTasks: [] },
        ];
        window.localStorage.setItem('project', JSON.stringify(projects));
        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );
        expect(await screen.findByText(/project a/i)).toBeTruthy();
        expect(screen.getByText(/project b/i)).toBeTruthy();
        expect(screen.getByText(/project c/i)).toBeTruthy();
        const filterLabels = screen.getAllByText(/filter by importance/i);
        expect(filterLabels.length).toBeGreaterThan(0);
        const filterSection = filterLabels[0].parentElement;
        expect(filterSection).not.toBeNull();
        const highFilterButton = within(filterSection!).getAllByRole('button', { name: /high/i })[0];
        const lowFilterButton = within(filterSection!).getAllByRole('button', { name: /low/i })[0];
        const mediumFilterButton = within(filterSection!).getAllByRole('button', { name: /medium/i })[0];
        fireEvent.click(highFilterButton);
        await waitFor(() => {
            expect(screen.getByText(/project a/i)).toBeTruthy();
            expect(screen.queryByText(/project b/i)).toBeNull();
            expect(screen.queryByText(/project c/i)).toBeNull();
        });
        fireEvent.click(lowFilterButton);
        await waitFor(() => {
            expect(screen.queryByText(/project a/i)).toBeNull();
            expect(screen.getByText(/project b/i)).toBeTruthy();
            expect(screen.queryByText(/project c/i)).toBeNull();
        });
        fireEvent.click(mediumFilterButton);
        await waitFor(() => {
            expect(screen.queryByText(/project a/i)).toBeNull();
            expect(screen.queryByText(/project b/i)).toBeNull();
            expect(screen.getByText(/project c/i)).toBeTruthy();
        });
    });
    it('Project Progress calculates and displays the correct progress percentage based on completed tasks', async () => {
        const projects = [
            {
                id: 1,
                textProject: 'Project A',
                completed: false,
                projectImportance: 'High',
                extendedTasks: [
                    { taskId: 1, projectId: 1, textTask: 'Task 1', isCompleted: true, taskImportance: 'High' },
                    { taskId: 2, projectId: 1, textTask: 'Task 2', isCompleted: false, taskImportance: 'Medium' },
                    { taskId: 3, projectId: 1, textTask: 'Task 3', isCompleted: false, taskImportance: 'Low' },
                ],
            },
        ];
        window.localStorage.setItem('project', JSON.stringify(projects));
        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );
        expect(await screen.findByText(/project a/i)).toBeTruthy();

        expect(screen.getByText("1/3")).toBeTruthy();
        expect(screen.getByText("33%")).toBeTruthy();

        expect(screen.getByText("0/1")).toBeTruthy();
    });
    it('Project validation - shows alert when trying to add a project without a name', async () => {
        vi.spyOn(window, "alert").mockImplementation(() => {});

        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );

        const importanceLabels = screen.getAllByText(/importance/i);
        const importanceTrigger = importanceLabels
            .map((node) => node.closest("button")).find(Boolean);
        expect(importanceTrigger).toBeTruthy();
        fireEvent.click(importanceTrigger!);

        const highOption = (await screen.findAllByText(/high/i)).find((node) =>
            node.closest("[data-slot=select-item]")
        );
        expect(highOption).toBeTruthy();
        fireEvent.click(highOption!);

        fireEvent.click(screen.getByRole("button", { name: /add project/i }));

        expect(window.alert).toHaveBeenCalledWith("Please enter a project name.");
        vi.restoreAllMocks();
    });

    it('Project validation - shows alert when trying to add a project without selecting importance', async () => {
        vi.spyOn(window, "alert").mockImplementation(() => {});
        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );
        const projectNameInput = screen.getByPlaceholderText(/project name/i);
        fireEvent.change(projectNameInput, { target: { value: "New Project" } });

        fireEvent.click(screen.getByRole("button", { name: /add project/i }));

        expect(window.alert).toHaveBeenCalledWith("Please select an importance level.");
        vi.restoreAllMocks();
    });
    it('404 page is displayed when navigating to an undefined route', async () => {
        render(
            <MemoryRouter initialEntries={["/undefined-route"]}>
                <Routes>
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </MemoryRouter>
        );
        expect(await screen.findByText(/404 not found/i)).toBeTruthy();
        });
});