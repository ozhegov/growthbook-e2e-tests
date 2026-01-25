export const FEATURE_INVALID_KEYS = [
  { value: 'test feature', reason: 'пробел посередине' },
  { value: ' test', reason: 'пробел в начале' },
  { value: 'test ', reason: 'пробел в конце' },
  { value: 'test@feature', reason: 'спецсимвол @' },
  { value: 'test#feature', reason: 'спецсимвол #' },
  { value: 'test/feature', reason: 'спецсимвол /' },
  { value: 'test_feature!', reason: 'спецсимвол !' },
  { value: 'тестовая_фича', reason: 'кириллица' },
  { value: '👍', reason: 'эмодзи' },
];
