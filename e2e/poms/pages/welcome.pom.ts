import type { Locator, Page } from '@playwright/test';
import { URLS, WELCOME_PAGE } from '../../constants';
import type { UserRegistration } from '../../types/user';
import { BasePOM } from '../base.pom';

export class WelcomePagePOM extends BasePOM {
  readonly root: Locator;

  /** Общие элементы страницы */
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;

  /** Форма логина */
  readonly loginFormHeader: Locator;
  readonly registrationLink: Locator;

  /** Форма регистрации */
  readonly registrationFormHeader: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);

    this.root = this.page.locator('div.welcome');

    /** Общие элементы страницы */
    this.form = this.root.locator('form');
    this.nameInput = this.form.getByLabel(WELCOME_PAGE.INPUTS.NAME);
    this.emailInput = this.form.getByLabel(WELCOME_PAGE.INPUTS.EMAIL);
    this.passwordInput = this.form.getByLabel(WELCOME_PAGE.INPUTS.PASSWORD);

    /** Форма логина */
    this.loginFormHeader = this.form.getByRole('heading', { name: WELCOME_PAGE.LOGIN_FORM.TITLE });
    this.registrationLink = this.form.getByRole('link', {
      name: WELCOME_PAGE.LOGIN_FORM.LINKS.REGISTRATION,
    });

    /** Форма регистрации */
    this.registrationFormHeader = this.form.getByRole('heading', {
      name: WELCOME_PAGE.REGISTRATION_FORM.TITLE,
    });
    this.createAccountButton = this.form.getByRole('button', {
      name: WELCOME_PAGE.REGISTRATION_FORM.BUTTONS.SIGN_UP,
    });
  }

  async open() {
    await super.open(URLS.WELCOME_PAGE);
  }

  /** Общие элементы страницы */
  async fillNameInput(name: string) {
    await this.fillInput(this.nameInput, name);
  }

  async fillEmailInput(email: string) {
    await this.fillInput(this.emailInput, email);
  }

  async fillPasswordInput(password: string) {
    await this.fillInput(this.passwordInput, password);
  }

  /** Форма логина */
  async openRegistrationForm() {
    await this.registrationLink.click();
  }

  /** Форма регистрации */
  async fillRegistrationForm(userData: UserRegistration) {
    await this.fillNameInput(userData.name);
    await this.fillEmailInput(userData.email);
    await this.fillPasswordInput(userData.password);
  }

  async submitRegistrationForm() {
    await this.createAccountButton.click();
  }
}
