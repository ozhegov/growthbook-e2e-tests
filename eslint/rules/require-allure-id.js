export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require @allure.id tag in test name',
    },
    schema: [],
    messages: {
      missingAllureId: 'Название теста должно содержать тег @allure.id',
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

          if (!/@allure\.id=/.test(testName)) {
            context.report({
              node,
              messageId: 'missingAllureId',
            });
          }
        }
      },
    };
  },
};
