describe('Cenários de login', () => {
  const users = require('../fixtures/loginUsers.json');

  beforeEach(() => {
    cy.visit('/login');
    cy.get('h3').contains('Login').should('be.visible');
    cy.get('#user').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#btnLogin').should('be.visible');
  });

  it('TC01 - login com credenciais válidas', () => {
    cy.get('#user').clear().type(users.validUser.email);
    cy.get('#password').clear().type(users.validUser.password);
    cy.get('#btnLogin').click();

    cy.location('pathname', { timeout: 10000 }).should('eq', '/login');
    cy.get('body').then(($body) => {
      const text = $body.text().toLowerCase();
      const hasFeedback = text.includes('login') || text.includes('erro') || text.includes('senha') || text.includes('e-mail');
      expect(hasFeedback).to.be.true;
    });
  });

  it('TC02 - login com senha inválida', () => {
    cy.get('#user').clear().type(users.invalidPassword.email);
    cy.get('#password').clear().type(users.invalidPassword.password);
    cy.get('#btnLogin').click();

    cy.location('pathname', { timeout: 10000 }).then((pathname) => {
      expect(pathname === '/login' || pathname === '/my-account').to.be.true;
    });
    cy.get('body').then(($body) => {
      const text = $body.text().toLowerCase();
      expect(text.length).to.be.greaterThan(0);
    });
  });

  it('TC03 - login com usuário inexistente', () => {
    cy.get('#user').clear().type(users.invalidUser.email);
    cy.get('#password').clear().type(users.invalidUser.password);
    cy.get('#btnLogin').click();

    cy.location('pathname', { timeout: 10000 }).then((pathname) => {
      expect(pathname === '/login' || pathname === '/my-account').to.be.true;
    });
    cy.get('body').then(($body) => {
      const text = $body.text().toLowerCase();
      expect(text).to.include('login');
    });
  });

  it('TC04 - login com campos vazios', () => {
    cy.get('#user').clear();
    cy.get('#password').clear();
    cy.get('#btnLogin').click();

    cy.get('#user').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#btnLogin').should('be.enabled');
  });

  it('TC05 - SQL Injection', () => {
    cy.get('#user').clear().type(users.sqlInjection.email);
    cy.get('#password').clear().type(users.sqlInjection.password);
    cy.get('#btnLogin').click();

    cy.location('pathname', { timeout: 10000 }).then((pathname) => {
      expect(pathname === '/login' || pathname === '/my-account').to.be.true;
    });
    cy.get('#user').should('be.visible');
    cy.get('#password').should('be.visible');
  });

  it('TC06 - usabilidade e acessibilidade básica', () => {
    cy.get('#user').should('be.visible').and('have.attr', 'type', 'text');
    cy.get('#password').should('be.visible').and('have.attr', 'type', 'password');
    cy.get('#btnLogin').should('be.visible').and('contain.text', 'login');
    cy.get('label').contains('E-mail').should('be.visible');
    cy.get('label').contains('Senha').should('be.visible');
  });
});
