
describe('User flow', () => {
    it('create project, add task, mark task complete', () => {
        cy.clearLocalStorage();
        cy.visit('http://localhost:5173/user/project');

        // create project
        cy.get('input[placeholder="Project Name"]').type('My Project');
        cy.get('button[role="combobox"]').click();
        cy.get('[data-slot="select-item"]').contains('High').click();
        cy.get('button').contains('Add Project').click();
        cy.contains('My Project').should('be.visible');

        // click the project
        cy.contains('h2', 'My Project').click();

        // add the task
        cy.get('input[placeholder="Task Name"]').type('My Task');
        cy.get('button[role="combobox"]').click();
        cy.get('[data-slot="select-item"]').contains('Medium').click();
        cy.get('button').contains('Add Task').click();
        cy.contains('My Task').should('be.visible');

        // mark the task as complete
        cy.contains('My Task').closest('li').find('[data-slot="checkbox"]').click();
        cy.contains('My Task').closest('li').find('[data-slot="checkbox"]').should('have.attr', 'data-state', 'checked');
    });

    it('Adds 3 projects, sorts them from A to Z then Z to A then importance from high to low - low to high', () => {
        cy.clearLocalStorage();
        cy.visit('http://localhost:5173/user/project');

        cy.get('input[placeholder="Project Name"]').type('C Project');
        cy.get('button[role="combobox"]').click();
        cy.get('[data-slot="select-item"]').contains('Medium').click();
        cy.get('button').contains('Add Project').click();
        cy.contains('C Project').should('be.visible');

        cy.get('input[placeholder="Project Name"]').type('A Project');
        cy.get('button[role="combobox"]').click();
        cy.get('[data-slot="select-item"]').contains('High').click();
        cy.get('button').contains('Add Project').click();
        cy.contains('A Project').should('be.visible');

        cy.get('input[placeholder="Project Name"]').type('B Project');
        cy.get('button[role="combobox"]').click();
        cy.get('[data-slot="select-item"]').contains('Low').click();
        cy.get('button').contains('Add Project').click();
        cy.contains('B Project').should('be.visible');

        cy.contains('h2', 'Project').click();
        cy.get('li h2').eq(0).should('have.text', 'A Project');
        cy.get('li h2').eq(1).should('have.text', 'B Project');
        cy.get('li h2').eq(2).should('have.text', 'C Project');

        cy.contains('h2', 'Project').click();
        cy.get('li h2').eq(0).should('have.text', 'C Project');
        cy.get('li h2').eq(1).should('have.text', 'B Project');
        cy.get('li h2').eq(2).should('have.text', 'A Project');
        
        cy.contains('h2', 'Importance').click();
        cy.get('li h2').eq(0).should('have.text', 'A Project');
        cy.get('li h2').eq(1).should('have.text', 'C Project');
        cy.get('li h2').eq(2).should('have.text', 'B Project');

        cy.contains('h2', 'Importance').click();
        cy.get('li h2').eq(0).should('have.text', 'B Project');
        cy.get('li h2').eq(1).should('have.text', 'C Project');
        cy.get('li h2').eq(2).should('have.text', 'A Project');       
    });
});