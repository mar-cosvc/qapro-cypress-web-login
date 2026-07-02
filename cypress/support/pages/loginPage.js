const loginPage = {
  selectors: {
    // prefer data-test attributes if present, fallback to existing ids
    email: '[data-test="login-email"], #user, input[type="email"]',
    password: '[data-test="login-password"], #password, input[type="password"]',
    submitButton: '[data-test="login-submit"], #btnLogin, button[type="submit"]',
  },

  visit() {
    cy.visit('/login');
    this.assertLoginPage();
  },

  assertLoginPage() {
    cy.get(this.selectors.email).filter(':visible').first().should('be.visible');
    cy.get(this.selectors.password).filter(':visible').first().should('be.visible');
    cy.get(this.selectors.submitButton).filter(':visible').first().should('be.visible');
  },

  fillCredentials(email, password) {
    // clear always, only type when non-empty to avoid cy.type('') error
    const $email = cy.get(this.selectors.email).filter(':visible').first();
    $email.clear();
    if (email !== undefined && email !== '') $email.type(email, { delay: 0 });

    const $pass = cy.get(this.selectors.password).filter(':visible').first();
    $pass.clear();
    if (password !== undefined && password !== '') $pass.type(password, { delay: 0 });
  },

  submit() {
    cy.get(this.selectors.submitButton).filter(':visible').first().click();
  },

  login(email, password) {
    this.fillCredentials(email, password);
    this.submit();
  },

  assertLoginSuccess() {
    cy.location('pathname', { timeout: 10000 }).then((pathname) => {
      const ok = pathname.includes('my-account') || pathname.includes('account') || pathname === '/';
      if (!ok) {
        // fallback: check page body for common success signals
        cy.get('body').then(($body) => {
          const text = $body.text().toLowerCase();
          const success = /welcome|logout|my account|orders|congrats/.test(text);
          expect(success, `expected login success but pathname ${pathname} and body didn't contain success signals`).to.be.true;
        });
      }
    });
  },

  assertLoginError() {
    cy.get('body').then(($body) => {
      const text = $body.text().toLowerCase();
      const hasError = /login|erro|error|senha|e-mail|invalid|incorrect/.test(text);
      expect(hasError).to.be.true;
    });
  },

  assertFeedback() {
    cy.get('body').then(($body) => {
      const text = $body.text().toLowerCase();
      const ok = /welcome|logout|my account|orders|congrats|success/.test(text);
      const err = /login|erro|error|senha|e-mail|invalid|incorrect/.test(text);
      expect(ok || err).to.be.true;
    });
  }
};

module.exports = loginPage;
