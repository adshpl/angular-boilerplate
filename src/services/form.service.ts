import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { ExceptionTypes } from 'constants/exception-types';
import { TRequestGraphqlException } from 'graphql/request.graphql';

const { VALIDATION, ERROR } = ExceptionTypes;

export type TFieldsDictionary = {
  [key: string]: string[];
};

export type TExceptionsDictionary = {
  validationExceptions: {
    field: string;
    value: string;
  }[];
  errorExceptions: string[];
};

export type TErrorMessageAsValidationError = Record<string, boolean>;

@Injectable()
export class FormService {
  constructor(private logger: NGXLogger) {}

  setServerErrorsToFormGroupControls(
    formGroup: FormGroup,
    exceptionsDictionary: TExceptionsDictionary,
  ): void {
    const { logger } = this;
    const { validationExceptions, errorExceptions } = exceptionsDictionary;

    const fieldsDictionary: TFieldsDictionary = {};

    if (validationExceptions.length > 0) {
      validationExceptions.forEach((exception) => {
        const { field, value } = exception;

        if (fieldsDictionary[field]) {
          fieldsDictionary[field].push(value);
        } else {
          fieldsDictionary[field] = [value];
        }
      });

      Object
        .keys(fieldsDictionary)
        .forEach((field) => {
          const formField = formGroup.get(field);
          if (formField) {
            const values = fieldsDictionary[field];
            const errors = this.convertErrorMessagesToValidationErrors(values);
            formField.setErrors(errors);
          } else {
            logger.debug(`Unknown form field: ${field}`);
          }
        });
    }

    if (errorExceptions.length > 0) {
      const errors = this.convertErrorMessagesToValidationErrors(errorExceptions);
      formGroup.setErrors(errors);
    }
  }

  collectErrorMessages(exceptions: TRequestGraphqlException[]): TExceptionsDictionary {
    const { logger } = this;

    const exceptionsDictionary: TExceptionsDictionary = {
      validationExceptions: [],
      errorExceptions: [],
    };

    exceptions
      .forEach((exception) => {
        const type = exception?.type;
        const messages = exception?.response?.messages;

        switch (type) {
          case VALIDATION:
            this.setValidationExceptionsDictionary(messages, exceptionsDictionary);
            break;
          case ERROR:
            this.setErrorExceptionsDictionary(messages, exceptionsDictionary);
            break;
          default:
            logger.debug(`Unknown form exception type: ${type}`);
        }
      });

    return exceptionsDictionary;
  }

  private convertErrorMessagesToValidationErrors(values: string[]): TErrorMessageAsValidationError {
    const errors: TErrorMessageAsValidationError = {};
    values.forEach((value: string) => {
      errors[value] = true;
    });

    return errors;
  }

  private setValidationExceptionsDictionary(
    messages: string[],
    exceptionsDictionary: TExceptionsDictionary,
  ): void {
    const { logger } = this;

    if (messages?.length > 0) {
      messages.forEach((message) => {
        const [field, value] = message.split(':');

        exceptionsDictionary.validationExceptions.push({
          field,
          value,
        });
      });
    } else {
      logger.debug(`Form server validation messages count is 0`);
    }
  }

  private setErrorExceptionsDictionary(
    messages: string[],
    exceptionsDictionary: TExceptionsDictionary,
  ): void {
    const { logger } = this;

    if (messages?.length > 0) {
      exceptionsDictionary.errorExceptions = messages; // eslint-disable-line no-param-reassign
    } else {
      logger.debug(`Form server error messages count is 0`);
    }
  }
}
