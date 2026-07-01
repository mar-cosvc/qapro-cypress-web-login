/// <reference types="cypress" />
describe("Comandos básicos", () => {
    it("Acessar uma URL", () => {
        cy.visit('https://automationpratice.com.br/login')
    });

    it("Encontrar um elemento", () => {
        cy.visit('https://automationpratice.com.br/login')
        // get ()
        cy.get('#user');
    });
        // find () - seleciona um elemento
        cy.visit('https://automationpratice.com.br/login')
        cy.get(".mc-form").find("form-control");
    });
        // contains () - seleciona um elemento por texto
        cy.visit('https://automationpratice.com.br/login')
        cy.get(".mc-form").contains("Send");

    });

    // Cenário 3 - Login com usuário inexistente
    it("Preencher um campo", () => {
        
    })

    it("Click", () => {
    })

    it("Select/Dropdown", () => {
    })

    it("Preencher um campo", () => {
    })

    it("Preencher um campo", () => {
    })
})
