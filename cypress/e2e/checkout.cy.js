const checkoutPage = require('../support/pages/checkoutPage');
const fixtures = require('../fixtures/checkoutData.json');
const { faker } = require('@faker-js/faker');

describe('Checkout - Page Object (enxuto com overrides)', () => {
  beforeEach(() => {
    checkoutPage.visit();
  });

  it('TC01 - cadastro válido (faker inputs)', () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      email: faker.internet.email(),
      zip: faker.location.zipCode('#####'),
      address: faker.location.streetAddress(),
      notes: faker.lorem.sentence(),
    };
    checkoutPage.fillBillingInfo({ ...fixtures.validBilling, ...data });
    checkoutPage.submit();
    checkoutPage.assertSuccessfulSubmission();
  });

  it('TC02 - cadastro com overrides (faker email e zip)', () => {
    const overrides = { email: faker.internet.email(), zip: faker.location.zipCode('#####') };
    checkoutPage.fillBillingInfo({ ...fixtures.validBilling, ...overrides });
    checkoutPage.submit();
    checkoutPage.assertSuccessfulSubmission();
  });

  it('TC03 - campos obrigatórios faltando (deve exibir erro)', () => {
    const data = { ...fixtures.validBilling, lastName: '', firstName: '' };
    // other fields populated with faker
    data.email = faker.internet.email();
    data.company = faker.company.name();
    checkoutPage.fillBillingInfo(data);
    checkoutPage.submit();
    checkoutPage.assertValidationError();
  });

  it('TC04 - email inválido', () => {
    checkoutPage.fillBillingInfo({ ...fixtures.validBilling, email: 'invalid-email' });
    checkoutPage.submit();
    checkoutPage.assertValidationError();
  });

  it('TC05 - entradas longas (faker)', () => {
    const long = faker.lorem.words(80);
    checkoutPage.fillBillingInfo({ ...fixtures.validBilling, firstName: long, lastName: long, company: long, address: long, notes: faker.lorem.paragraph() });
    checkoutPage.submit();
    checkoutPage.assertValidationError();
  });

  it('TC06 - newsletter e links (faker)', () => {
    checkoutPage.fillNewsletter(faker.internet.email());
    checkoutPage.assertButtonExists(/send mail|subscribe|submit/i);
    checkoutPage.assertLinkExists('/shop');
  });

  it('TC07 - elementos clicáveis e payments', () => {
    checkoutPage.assertButtonExists(/place order|save|checkout|pay/i);
    checkoutPage.selectPayment('HTML');
    checkoutPage.assertFieldVisible('#fname');
  });
});
