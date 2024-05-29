import {
  MIN_INPUT_DOUBLE_VALUE,
  MIN_INPUT_VALUE,
  MIN_LENGTH_VALUE,
  PHONE_LENGTH,
} from '@/const/utils';

export enum MForm {
  ATTRIBUTE_REQUIRED = 'El atributo es requerido.',
  MIN_VALUE = `El valor mínimo es ${MIN_INPUT_VALUE}.`,
  MIN_VALUE_DOUBLE = `El valor mínimo es ${MIN_INPUT_DOUBLE_VALUE}.`,
  MIN_LENGTH = `El atributo debe contener al menos ${MIN_LENGTH_VALUE} caractéres.`,
  ATTRIBUTE_PRODUCT_INCOMPLETE = 'Tenés un producto sin asignar o incompleto.',
  ATTRIBUTE_RECIPE_INCOMPLETE = 'Tenés un material sin asignar o incompleto.',
  INVALID_EMAIL = 'El email no es válido.',
  MIN_PHONE_LENGTH = `El teléfono debe contener al menos ${PHONE_LENGTH} números.`,
}
