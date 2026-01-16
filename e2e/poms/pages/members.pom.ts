import type { Locator, Page } from '@playwright/test';
import { MEMBERS_PAGE, URLS } from '../../constants';
import { expect } from '../../test';
import type { UserRoleLower } from '../../types/user-role';
import { BasePOM } from '../base.pom';

export class MembersPagePOM extends BasePOM {
  readonly root: Locator;

  /** Основные элементы страницы */
  readonly pageHeader: Locator;

  /** Секция Active Members */
  readonly activeMembersBlockHeader: Locator;
  readonly activeMembersSection: Locator;
  readonly activeMembersTable: Locator;

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
      name: MEMBERS_PAGE.MODAL.ADD_USER,
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
  }

  async open() {
    await super.open(URLS.SETTINGS_MEMBERS);
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
  async selectGlobalRole(role: UserRoleLower) {
    await this.selectOptionInDropdown(this.globalRoleSelector, this.selectorOptions, role);
  }

  async addUser() {
    await this.addButton.click();
  }
}
