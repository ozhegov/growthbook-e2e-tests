import { expect as baseExpect, mergeTests } from '@playwright/test';
import { authFixture, fakerFixture, mockFixture, pomFixture, routeFixture } from '../e2e/fixtures';

export const test = mergeTests(authFixture, pomFixture, fakerFixture, mockFixture, routeFixture);
export const expect = baseExpect;
