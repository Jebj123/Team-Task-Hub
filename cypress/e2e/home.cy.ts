
describe('Adding project', () => {
    it('should add a new project', () => {
        cy.visit('http://localhost:5173/user/project');
        cy.get('input[placeholder="Project Name"]').type('New Project');
        cy.get('button[role="combobox"]').click();
        cy.get('[data-slot="select-item"]').contains('High').click();
        cy.get('button').contains('Add Project').click();
        cy.contains('New Project').should('be.visible');
    });
    it('should delete a project after pressing the delete button', () => {
        cy.visit('http://localhost:5173/user/project');
        cy.get('input[placeholder="Project Name"]').type('Project to Delete');
        cy.get('button[role="combobox"]').click();
        cy.get('[data-slot="select-item"]').contains('Medium').click();
        cy.get('button').contains('Add Project').click();
        cy.contains('Project to Delete').should('be.visible');
        cy.get('button').contains('Delete').click();
        cy.contains('Project to Delete').should('not.exist');
    });
    it('should add a new task to a project', () => {
        const project = [{ id: 1, textProject: 'Test Project', completed: false, projectImportance: 'high', extendedTasks: [] }];
        cy.visit('http://localhost:5173/user/task/1', {
            onBeforeLoad(win) {
                win.localStorage.setItem('project', JSON.stringify(project));
            }
        });
        cy.get('input[placeholder="Task Name"]').type('New Task');
        cy.get('button[role="combobox"]').click();
        cy.get('[data-slot="select-item"]').contains('Low').click();
        cy.get('button').contains('Add Task').click();
        cy.contains('New Task').should('be.visible');
    });
    it('should delete a task after pressing the delete button', () => {
        const project = [{
            id: 1,
            textProject: 'Test Project',
            completed: false,
            projectImportance: 'high',
            extendedTasks: [
                { taskId: 1, projectId: 1, textTask: 'Task to Delete', taskImportance: 'medium', isCompleted: false }
            ]
        }];
        cy.visit('http://localhost:5173/user/task/1', {
            onBeforeLoad(win) {
                win.localStorage.setItem('project', JSON.stringify(project));
            }
        });
        cy.contains('Task to Delete').should('be.visible');
        cy.get('button').contains('Delete').click();
        cy.contains('Task to Delete').should('not.exist');
    });
    it('should mark a task as completed after pressing the complete button', () => {
        const project = [{
            id: 1,
            textProject: 'Test Project',
            completed: false,
            projectImportance: 'high',
            extendedTasks: [
                { taskId: 1, projectId: 1, textTask: 'Task to Complete', taskImportance: 'medium', isCompleted: false }
            ]
        }];
        cy.visit('http://localhost:5173/user/task/1', {
            onBeforeLoad(win) {
                win.localStorage.setItem('project', JSON.stringify(project));
            }
        });
        cy.contains('Task to Complete').should('be.visible');
        cy.contains('Task to Complete').closest('li').find('[data-slot="checkbox"]').click();
        cy.contains('Task to Complete').closest('li').find('[data-slot="checkbox"]').should('have.attr', 'data-state', 'checked');
    });
    it('searches for a task and displays the correct results', () => {
        const project = [{
            id: 1,
            textProject: 'Test Project',
            completed: false,
            projectImportance: 'high',
            extendedTasks: [
                { taskId: 1, projectId: 1, textTask: 'First Task', taskImportance: 'medium', isCompleted: false },
                { taskId: 2, projectId: 1, textTask: 'Second Task', taskImportance: 'low', isCompleted: false },
                { taskId: 3, projectId: 1, textTask: 'Another Task', taskImportance: 'high', isCompleted: false }
            ]
        }];
        cy.visit('http://localhost:5173/user/task/1', {
            onBeforeLoad(win) {
                win.localStorage.setItem('project', JSON.stringify(project));
            }
        });
        cy.get('input[placeholder="search"]').type('Second');
        cy.get('button').contains('Search').click();
        cy.contains('Second Task').should('be.visible');
        cy.contains('First Task').should('not.exist');
        cy.contains('Another Task').should('not.exist');
    });
    it('searches for a project and displays the correct results', () => {
        const projects = [
            { id: 1, textProject: 'First Project', completed: false, projectImportance: 'high', extendedTasks: [] },
            { id: 2, textProject: 'Second Project', completed: false, projectImportance: 'medium', extendedTasks: [] },
            { id: 3, textProject: 'Another Project', completed: false, projectImportance: 'low', extendedTasks: [] }
        ];
        cy.visit('http://localhost:5173/user/project', {
            onBeforeLoad(win) {
                win.localStorage.setItem('project', JSON.stringify(projects));
            }
        });
        cy.get('input[placeholder="search"]').type('Second');
        cy.get('button').contains('Search').click();
        cy.contains('Second Project').should('be.visible');
        cy.contains('First Project').should('not.exist');
        cy.contains('Another Project').should('not.exist');
    });
    it('sorts projects from a to z by clicking the project  header', () => {
        const projects = [
            { id: 1, textProject: 'B Project', completed: false, projectImportance: 'high', extendedTasks: [] },
            { id: 2, textProject: 'A Project', completed: false, projectImportance: 'medium', extendedTasks: [] },
            { id: 3, textProject: 'C Project', completed: false, projectImportance: 'low', extendedTasks: [] }
        ];
        cy.visit('http://localhost:5173/user/project', {
            onBeforeLoad(win) {
                win.localStorage.setItem('project', JSON.stringify(projects));
            }
        });
        cy.contains('h2', 'Project').click();
        cy.get('li h2').eq(0).should('have.text', 'A Project');
        cy.get('li h2').eq(1).should('have.text', 'B Project');
        cy.get('li h2').eq(2).should('have.text', 'C Project');
    });
    it('sorts tasks from a to z by clicking the task header', () => {
        const project = [{
            id: 1,
            textProject: 'Test Project',
            completed: false,
            projectImportance: 'high',
            extendedTasks: [
                { taskId: 1, projectId: 1, textTask: 'B Task', taskImportance: 'medium', isCompleted: false },
                { taskId: 2, projectId: 1, textTask: 'A Task', taskImportance: 'low', isCompleted: false },
                { taskId: 3, projectId: 1, textTask: 'C Task', taskImportance: 'high', isCompleted: false }
            ]
        }];
        cy.visit('http://localhost:5173/user/task/1', {
            onBeforeLoad(win) {
                win.localStorage.setItem('project', JSON.stringify(project));
            }
        });
        cy.contains('h1.cursor-pointer', 'Tasks').click();
        cy.get('li span.min-w-0').eq(0).should('have.text', 'A Task');
        cy.get('li span.min-w-0').eq(1).should('have.text', 'B Task');
        cy.get('li span.min-w-0').eq(2).should('have.text', 'C Task');
    });
});