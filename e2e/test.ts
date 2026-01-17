import { expect as baseExpect, mergeTests } from '@playwright/test';
import { authFixture, fakerFixture, pomFixture } from '../e2e/fixtures';

export const test = mergeTests(authFixture, pomFixture, fakerFixture);
export const expect = baseExpect;
