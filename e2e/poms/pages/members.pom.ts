import type { Locator, Page } from '@playwright/test';
import { MEMBERS_PAGE, URLS } from '../../constants';
import { expect } from '../../test';
import type { UserRoleTest } from '../../types/user-role';
import { BasePOM } from '../base.pom';

export class MembersPagePOM extends BasePOM {
  readonly root: Locator;

  /** Основные элементы страницы */
  readonly pageHeader: Locator;

  /** Секция Active Members */
  readonly activeMembersBlockHeader: Locator;
  readonly activeMembersSection: Locator;
  readonly activeMembersTable: Locator;
  readonly activeMembersActionButton: (userData: string) => Locator;
  readonly removeUserButton: Locator;

  /** Секция Orphaned Users */
  readonly orphanedUsersSection: Locator;
  readonly orphanedUsersBlockHeader: Locator;
  readonly orphanedUsersTable: Locator;
  readonly orphanedUsersActionButton: (userData: string) => Locator;
  readonly addBackToAccountButton: Locator;

  /** Модальное окно Add user*/
  readonly addUserModal: Locator;
  readonly addUserModalHeader: Locator;
  readonly globalRoleSelector: Locator;
  readonly selectorOptions: Locator;
  readonly addButton: Locator;

  /** Модальное окно Delete user*/
  readonly deleteUserModal: Locator;
  readonly deleteUserModalHeader: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.root = this.page.locator('div.pagecontents');

    /** Основные элементы страницы */
    this.pageHeader = this.root.getByRole('heading', { name: MEMBERS_PAGE.TITLE });

    /** Секция Active Members */
    this.activeMembersBlockHeader = this.root.getByRole('heading', {
      name: MEMBERS_PAGE.SECTIONS.ACTIVE_MEMBERS,
    });
    this.activeMembersSection = this.root.locator('div', {
      has: this.activeMembersBlockHeader,
    });
    this.activeMembersTable = this.activeMembersSection.getByRole('table').first();
    this.activeMembersActionButton = (userData: string) =>
      this.activeMembersTable
        .locator('tr', { has: this.page.getByText(userData) })
        .locator('a.text-dark');
    this.removeUserButton = this.page.getByRole('link', {
      name: MEMBERS_PAGE.BUTTONS.REMOVE_USER,
    });

    /** Секция Orphaned Users */
    this.orphanedUsersBlockHeader = this.root.getByRole('heading', {
      name: new RegExp(MEMBERS_PAGE.SECTIONS.ORPHANED_USERS),
    });
    this.orphanedUsersSection = this.root.locator('div', {
      has: this.orphanedUsersBlockHeader,
    });
    this.orphanedUsersTable = this.orphanedUsersSection.getByRole('table');
    this.orphanedUsersActionButton = (userData: string) =>
      this.orphanedUsersTable
        .locator('tr', { has: this.page.getByText(userData) })
        .locator('a.text-dark');
    this.addBackToAccountButton = this.page.getByRole('button', {
      name: MEMBERS_PAGE.BUTTONS.ADD_BACK_TO_ACCOUNT,
    });

    /** Модальное окно Add user*/
    this.addUserModalHeader = this.page.getByRole('heading', {
      name: MEMBERS_PAGE.MODALS.ADD_USER,
    });
    this.addUserModal = this.page.locator('div.modal-content', {
      has: this.addUserModalHeader,
    });
    this.globalRoleSelector = this.addUserModal
      .locator('div.form-group', {
        has: this.page.getByText(MEMBERS_PAGE.DROPDOWNS.GLOBAL_ROLE.LABEL),
      })
      .locator('input[role="combobox"]');
    this.selectorOptions = this.addUserModal.getByRole('listbox');
    this.addButton = this.addUserModal.getByRole('button', {
      name: MEMBERS_PAGE.BUTTONS.ADD_USER,
      exact: true,
    });

    /** Модальное окно Delete user*/
    this.deleteUserModalHeader = this.page.getByRole('heading', {
      name: MEMBERS_PAGE.MODALS.DELETE_USER,
    });
    this.deleteUserModal = this.page.locator('form', {
      has: this.deleteUserModalHeader,
    });
    this.deleteButton = this.deleteUserModal.getByRole('button', {
      name: MEMBERS_PAGE.BUTTONS.DELETE,
    });
  }

  async open() {
    await super.open(URLS.SETTINGS_MEMBERS);
  }

  /** Секция Active Members */
  async openActiveMembersActionMenu(userData: string) {
    await this.activeMembersActionButton(userData).click();
  }

  async openDeleteUserModal() {
    await this.removeUserButton.click();
    await expect(this.deleteUserModal).toBeVisible();
  }

  /** Секция Orphaned Users */
  async openOrphanedUsersActionMenu(userData: string) {
    await this.orphanedUsersActionButton(userData).click();
  }

  async openAddUserModal() {
    await this.addBackToAccountButton.click();
    await expect(this.addUserModal).toBeVisible();
  }

  /** Модальное окно Add user*/
  async selectGlobalRole(role: UserRoleTest) {
    await this.selectOptionInDropdown(this.globalRoleSelector, this.selectorOptions, role);
  }

  async addUser() {
    await this.addButton.click();
  }

  /** Модальное окно Delete user*/
  async deleteUser() {
    await this.deleteButton.click();
  }
}
