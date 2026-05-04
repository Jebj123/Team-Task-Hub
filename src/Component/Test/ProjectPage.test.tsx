import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, within, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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
                textProject: "Project Alpha",
                completed: false,
                projectImportance: "High",
                extendedTasks: [],
            },
            {
                id: 2,
                textProject: "Project Beta",
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

        expect(await screen.findByText(/project alpha/i)).toBeTruthy();
        expect(screen.getByText(/project beta/i)).toBeTruthy();

        fireEvent.change(screen.getByPlaceholderText(/search/i), {
            target: { value: "Alpha" },
        });
        fireEvent.click(screen.getByRole("button", { name: /^search$/i }));

        expect(screen.getByText(/project alpha/i)).toBeTruthy();
        expect(screen.queryByText(/project beta/i)).toBeNull();
    });

    // Clear Search test

    it("shows all projects when search is cleared by clicking Search with no input", async () => {
        const projects = [
            { id: 1, textProject: "Project Alpha", completed: false, projectImportance: "High", extendedTasks: [] },
            { id: 2, textProject: "Project Beta", completed: false, projectImportance: "Low", extendedTasks: [] },
        ];
        window.localStorage.setItem("project", JSON.stringify(projects));
        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );

        expect(await screen.findByText(/project alpha/i)).toBeTruthy();
        expect(screen.getByText(/project beta/i)).toBeTruthy();

        const searchInput = screen.getByPlaceholderText(/search/i);
        fireEvent.change(searchInput, {
            target: { value: "Alpha" },
        });
        fireEvent.click(screen.getByRole("button", { name: /^search$/i }));

        expect(screen.getByText(/project alpha/i)).toBeTruthy();
        expect(screen.queryByText(/project beta/i)).toBeNull();

        fireEvent.change(searchInput, {
            target: { value: "" },
        });
        fireEvent.click(screen.getByRole("button", { name: /^search$/i }));

        expect(screen.getByText(/project alpha/i)).toBeTruthy();
        expect(screen.getByText(/project beta/i)).toBeTruthy();
    });

    // Filtering by Importance test

    it("filters projects by importance when the High filter button is clicked", async () => {
        const projects = [
            {
                id: 1,
                textProject: "Project Alpha",
                completed: false,
                projectImportance: "High",
                extendedTasks: [],
            },
            {
                id: 2,
                textProject: "Project Beta",
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

        const alphaMatches = await screen.findAllByText(/project alpha/i);
        expect(alphaMatches.length).toBeGreaterThan(0);
        expect(screen.getAllByText(/project beta/i).length).toBeGreaterThan(0);

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
            expect(screen.getAllByText(/project alpha/i).length).toBeGreaterThan(0);
            expect(screen.queryByText(/project beta/i)).toBeNull();
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
                textProject: "Project Alpha",
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
        expect(await screen.findByText(/project alpha/i)).toBeTruthy();

        const deleteButton = screen.getByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);
        await waitFor(() => {
            expect(screen.queryByText(/project alpha/i)).toBeNull();
        });
    });

    // sorting projects test

    it("sorts projects alphabetically when the Project header is clicked", async () => {
        const projects = [
            {
                id: 1,
                textProject: "Project Beta",
                completed: false,
                projectImportance: "Low",
                extendedTasks: [],
            },
            {
                id: 2,
                textProject: "Project Alpha",
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

        expect(await screen.findByText(/project alpha/i)).toBeTruthy();
        expect(screen.getByText(/project beta/i)).toBeTruthy();

        const projectHeader = screen.getAllByText(/^Project$/i).find(
            (node) => node.tagName === "H2"
        );
        expect(projectHeader).toBeTruthy();
        fireEvent.click(projectHeader!);

        const rows = screen.getAllByRole("listitem");
        expect(rows.length).toBe(2);
        expect(within(rows[0]).getByText(/project alpha/i)).toBeTruthy();
        expect(within(rows[1]).getByText(/project beta/i)).toBeTruthy();
    });
    // sorting importance test
    it("sorts projects by importance when the Importance header is clicked", async () => {
        const projects = [
            {   id: 1, textProject: "Project Alpha", completed: false, projectImportance: "Low", extendedTasks: [] },
            {   id: 2, textProject: "Project Beta", completed: false, projectImportance: "High", extendedTasks: [] },
        ];
        window.localStorage.setItem("project", JSON.stringify(projects));
        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );
        expect(await screen.findByText(/project alpha/i)).toBeTruthy();
        expect(screen.getByText(/project beta/i)).toBeTruthy();

        const importanceHeader = screen.getAllByText(/importance/i).find(
            (node) => node.tagName === "H2"
        );
        expect(importanceHeader).toBeTruthy();
        fireEvent.click(importanceHeader!);

        const rows = screen.getAllByRole("listitem");
        expect(rows.length).toBe(2);
        expect(within(rows[0]).getByText(/project beta/i)).toBeTruthy();
        expect(within(rows[1]).getByText(/project alpha/i)).toBeTruthy();

    });

    // sort by project status test
    it("sorts projects by completion status when the Project status header is clicked", async () => {
        const projects = [
            { id: 1, textProject: "Project Alpha", completed: true, projectImportance: "High", extendedTasks: [] },
            { id: 2, textProject: "Project Beta", completed: false, projectImportance: "Low", extendedTasks: [] },
        ];
        window.localStorage.setItem("project", JSON.stringify(projects));
        render(
            <MemoryRouter>
                <ProjectCard />
            </MemoryRouter>
        );
        expect(await screen.findByText(/project alpha/i)).toBeTruthy();
        expect(screen.getByText(/project beta/i)).toBeTruthy();

        const completedHeader = screen.getAllByText(/project status/i).find(
            (node) => node.tagName === "H2"
        );
        expect(completedHeader).toBeTruthy();
        fireEvent.click(completedHeader!);
        const rows = screen.getAllByRole("listitem");
        expect(rows.length).toBe(2);
        expect(within(rows[0]).getByText(/project alpha/i)).toBeTruthy();
        expect(within(rows[1]).getByText(/project beta/i)).toBeTruthy();
    });
});