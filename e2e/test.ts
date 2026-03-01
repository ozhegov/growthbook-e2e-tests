import { expect as baseExpect, mergeTests } from '@playwright/test';
import { apiFixture, authFixture, fakerFixture, pomFixture, routeFixture } from '../e2e/fixtures';

export const test = mergeTests(authFixture, pomFixture, fakerFixture, routeFixture, apiFixture);
export const expect = baseExpect;
