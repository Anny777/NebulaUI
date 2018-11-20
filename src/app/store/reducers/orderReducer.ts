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
  currentOrders = currentOrders.filter(co => {
    var r = orders.some(o => o.Id == co.Id);
    if (!r) {
      isChanged = true;
      console.log('order removed', co);
    }

    return r;
  });

  currentOrders.forEach(co => {
    var o = orders.find(c => c.Id == co.Id);
    if (!o) { return; }

    co.Dishes = co.Dishes
      .filter(cd => {
        var r = o.Dishes.some(d => d.CookingDishId == cd.CookingDishId);
        if (!r) {
          isChanged = true;
          console.log('dish removed', cd);
        }

        return r;
      });
  });

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
