import type { Faker } from '@faker-js/faker';

export interface TextboxOptions {
  minLength?: number;
  maxLength?: number;
  multiline?: boolean;
}

export function getText(
  faker: Faker,
  { minLength = 10, maxLength = 50, multiline = false }: TextboxOptions = {},
) {
  const text = faker.lorem.words(
    faker.number.int({
      min: Math.ceil(minLength / 5),
      max: Math.ceil(maxLength / 5),
    }),
  );

  return multiline ? text : text.replace(/\n/g, ' ');
}
