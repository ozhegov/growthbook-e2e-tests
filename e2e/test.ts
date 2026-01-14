import { expect as baseExpect, mergeTests } from '@playwright/test';
import { authFixture, pomFixture } from '../e2e/fixtures';

export const test = mergeTests(authFixture, pomFixture);
export const expect = baseExpect;
