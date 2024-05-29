export interface ErrorResponse {
  statusCode?: number;
  message?: string;
}

export enum ErrorMessages {
  API_NOT_AVAILABLE = 'El servicio no se encuentra disponible. Intente nuevamente mas tarde.',
}
