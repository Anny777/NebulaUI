import { createAction, props } from '@ngrx/store';
import { IOrder } from 'src/app/models/order';

export const loadOrders = createAction('[Orders] Load');
export const loadOrdersSuccess = createAction('[Orders] Load success', props<{ orders: IOrder[] }>());
export const loadOrdersFail = createAction('[Orders] Load fail', props<any>());

export const createOrder = createAction('[Orders] Create', props<{table: number}>());
export const createOrderSuccess = createAction('[Orders] Create success', props<{ id: string }>());
export const createOrderFail = createAction('[Orders] Create fail', props<any>());

export const getOrder = createAction('[Orders] Get', props<{ id: string }>());
export const getOrderSuccess = createAction('[Orders] Get success', props<{ order: IOrder }>());
export const getOrderFail = createAction('[Orders] Get fail', props<any>());

export const closeOrder = createAction('[Orders] Close', props<{ id: string }>());
export const closeOrderSuccess = createAction('[Orders] Close success', props<any>());
export const closeOrderFail = createAction('[Orders] Close fail', props<any>());

export const commentOrder = createAction('[Orders] Comment', props<{id: string, comment: string}>());
export const commentOrderSuccess = createAction('[Orders] Comment success', props<any>());
export const commentOrderFail = createAction('[Orders] Comment fail', props<any>());
