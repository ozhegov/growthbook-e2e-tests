import requireAllureId from './rules/require-allure-id.js';
import requireRoleTag from './rules/require-role-tag.js';

export default {
  rules: {
    'require-allure-id': requireAllureId,
    'require-role-tag': requireRoleTag,
  },
};
