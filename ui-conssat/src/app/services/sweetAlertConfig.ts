import { SweetAlertOptions } from 'sweetalert2';

export const deleteConfig: SweetAlertOptions = {
  title: 'Eliminación!',
  text: 'Se eliminó el registro Correctamente.',
  icon: 'success',
  confirmButtonText: '<i class="fa fa-arrow-right" aria-hidden="true"></i> OK',
  confirmButtonColor: '#72bf44',
};

export const saveConfig: SweetAlertOptions = {
  title: 'Registro!',
  text: 'El registro se realizó Correctamente.',
  icon: 'success',
  confirmButtonText: '<i class="fa fa-arrow-left" aria-hidden="true"></i> Aceptar',
  confirmButtonColor: '#72bf44',
};

export const editConfig: SweetAlertOptions = {
  title: 'Actualización!',
  text: 'El actualizó Correctamente.',
  confirmButtonText: '<i class="fa fa-arrow-left" aria-hidden="true"></i> Aceptar',
  confirmButtonColor: '#72bf44',
  icon: 'success'
};

export const errorConfig: SweetAlertOptions = {
  title: 'Error!',
  text: 'Algo salio mal.',
  icon: 'error'
};

export const decargaConfig: SweetAlertOptions = {
  title: 'Descarga Completa!',
  confirmButtonText: 'Continuar'
};

