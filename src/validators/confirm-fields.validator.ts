import { AbstractControl } from '@angular/forms';

export type TConfirmFieldsOptions = {
  message: string;
};

export type TConfirmFieldsError = {
  [key: string]: boolean;
};

export interface IConfirmFieldsFunction {
  (controls: AbstractControl): TConfirmFieldsError | null;
}

export function confirmFields(
  fieldNames: string[],
  options: TConfirmFieldsOptions,
): IConfirmFieldsFunction {
  const { message } = options;

  return (controls: AbstractControl): TConfirmFieldsError | null => {
    const fields = fieldNames
      .map((fieldName) => controls.get(fieldName))
      .filter((field) => !!field);

    const touchedFields = fields.filter((field) => field?.dirty || field?.touched);
    if (fields.length !== touchedFields.length) {
      return null;
    }

    const fieldsValues = fields.map((field) => field?.value);
    const allEqual = fieldsValues.every((fieldValue) => fieldValue === fieldsValues[0]);

    if (allEqual) {
      return null;
    }

    return {
      [message]: true,
    };
  };
}
