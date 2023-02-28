/** @format */
interface FData {
  [k: string]: Record<string, string | number | null | undefined | FData>;
}

type Rule<T> = {
  key: keyof T;
  message: string;
} & ({ type: 'required' } | { type: 'pattern'; regex: RegExp });

type Rules<T> = Rule<T>[];

export type { Rule, Rules, FData };

export const validate = <T>(formData: T, rules: Rules<T>) => {
  type Errors = {
    [k in keyof T]?: string[];
  };

  const errors: Errors = {};

  rules.forEach(rule => {
    const { key, type, message } = rule;
    const value = formData[key];
    switch (type) {
      case 'required':
        if (value === null || value === undefined || value === '') {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      case 'pattern':
        if (value && !rule.regex.test(value.toString())) {
          errors[key] = errors[key] ?? [];
          errors[key]?.push(message);
        }
        break;
      default:
        return;
    }
  });
  return errors;
};

function isEmpty(value: null | undefined | string | number | FData) {
  return value === null || value === undefined || value === '';
}

export const hasError = (errors: Record<string, string[]>) => {
  let result = false;
  for (let key in errors) {
    if (errors[key].length > 0) {
      result = true;
      break;
    }
  }
  return result;
};
