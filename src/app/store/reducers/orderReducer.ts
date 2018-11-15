import { IOrder } from "src/app/models/order";
import * as OrderActions from '../actions/orderActions'

export interface IOrderState {
  orders: IOrder[],
  isOrdersLoading: boolean,
  isOrderAdd: boolean,
  isOrderClose: boolean
}

const initialState: IOrderState = {
  orders: [],
  isOrdersLoading: false,
  isOrderAdd: false,
  isOrderClose: false
};

export function orderReducer(state: IOrderState = initialState, action: OrderActions.Actions): IOrderState {

  switch (action.type) {
    case OrderActions.LOAD_ORDERS:
      return { ...state, isOrdersLoading: true };
    case OrderActions.LOAD_ORDERS_SUCCESS:
      return {
        ..._mergeOrders(action.payload, state),
        isOrdersLoading: false
      }
    case OrderActions.LOAD_ORDERS_FAIL:
      return { ...state, isOrdersLoading: true };

    case OrderActions.ADD_ORDER:
      return { ...state, isOrderAdd: true };
    case OrderActions.ADD_ORDER_SUCCESS:
      return { ...state, isOrderAdd: false };
    case OrderActions.ADD_ORDER_FAIL:
      return { ...state, isOrderAdd: false };

    case OrderActions.CLOSE_ORDER:
      return { ...state, isOrderClose: true };
    case OrderActions.CLOSE_ORDER_SUCCESS:
      return { ...state, isOrderClose: false };
    case OrderActions.CLOSE_ORDER_FAIL:
      return { ...state, isOrderClose: true };

    default:
      return state;
  }

}

function _mergeOrders(orders: IOrder[], state: IOrderState): IOrderState {
  // Сразу обновляем если один из массивов пуст
  if ((state.orders.length == 0 && orders.length > 0) || (orders.length == 0 && state.orders.length > 0)) {
    console.log('full refresh');
    return {
      ...state,
      orders: orders
    }
  }

  // Добавляем новые и обновляем статусы блюд
  let currentOrders = state.orders.copyWithin(0, 0);
  let isChanged = false;
  for (let orderIndex = 0; orderIndex < orders.length; orderIndex++) {
    const order = orders[orderIndex];
    const currentOrder = currentOrders.find(c => c.Id == order.Id)

    if (!currentOrder) {
      console.log('new order', order);
      currentOrders.push(order);
      isChanged = true;
      continue;
    }

    for (let dishIndex = 0; dishIndex < order.Dishes.length; dishIndex++) {
      const dish = order.Dishes[dishIndex];
      const currentDish = currentOrder.Dishes.find(c => c.CookingDishId == dish.CookingDishId);

      if (!currentDish) {
        console.log('new dish', order);
        currentOrder.Dishes.push(dish);
        isChanged = true;
        continue;
      }

      if (currentDish.State != dish.State) {
        console.log('new dish state', dish);
        currentDish.State = dish.State;
        isChanged = true;
      }
    }
  }

  // Удаляем то что не пришло с сервера
  for (let currentOrderIndex = 0; currentOrderIndex < this.orders.length; currentOrderIndex++) {
    const currentOrder = this.orders[currentOrderIndex];
    const order = orders.find(c => c.Id == currentOrder.Id)

    if (!order) {
      console.log('remove order', currentOrder);
      currentOrders.splice(currentOrderIndex, 1);
      isChanged = true;
      continue;
    }

    // Удаляем блюда
    for (let currentDishIndex = 0; currentDishIndex < currentOrder.Dishes.length; currentDishIndex++) {
      const currentDish = currentOrder.Dishes[currentDishIndex];
      const dish = order.Dishes.find(c => c.CookingDishId == currentDish.CookingDishId);

      if (!dish) {
        console.log('remove dish', currentDish);
        currentOrder.Dishes.splice(currentDishIndex, 1);
        isChanged = true;
        continue;
      }
    }
  }

  if (isChanged) {
    console.log('state changed');
    return {
      ...state,
      orders: orders
    }
  }

  console.log('not changed');
  return state;
}
