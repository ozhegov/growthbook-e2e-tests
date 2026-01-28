export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require @role tag in test name',
    },
    schema: [],
    messages: {
      missingRole: 'Тест должен содержать тег @role',
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'test' &&
          node.arguments[0]?.type === 'Literal'
        ) {
          const testName = String(node.arguments[0].value);

          if (!/@role=/.test(testName)) {
            context.report({
              node,
              messageId: 'missingRole',
            });
          }
        }
      },
    };
  },
};
