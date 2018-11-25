import { IOrder } from "src/app/models/order";
import * as OrderActions from '../actions/orderActions'
import { IDishLoading } from "src/app/models/dishLoading";
import { IDish } from "src/app/models/dish";

export interface IOrderState {
  orders: IOrder[],
  currentOrder: IOrder,
  isCurrentOrderLoading: boolean,
  isOrdersLoading: boolean,
  isOrderAdd: boolean,
  isOrderClose: boolean,
  dishLoading: IDishLoading[]
}

const initialState: IOrderState = {
  orders: [],
  currentOrder: null,
  isCurrentOrderLoading: false,
  isOrdersLoading: false,
  isOrderAdd: false,
  isOrderClose: false,
  dishLoading: []
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

    case OrderActions.GET_ORDER:
      return { ...state, isCurrentOrderLoading: true };
    case OrderActions.GET_ORDER_SUCCESS:
      return {
        ...state,
        isCurrentOrderLoading: false,
        currentOrder: action.payload
      };
    case OrderActions.GET_ORDER_FAIL:
      return { ...state, isCurrentOrderLoading: false };

    case OrderActions.CLOSE_ORDER:
      return { ...state, isOrderClose: true };
    case OrderActions.CLOSE_ORDER_SUCCESS:
      return { ...state, isOrderClose: false };
    case OrderActions.CLOSE_ORDER_FAIL:
      return { ...state, isOrderClose: true };

    case OrderActions.ADD_DISH:
      return {
        ...state,
        dishLoading: _toggleDishLoading(state.dishLoading, action.payload[0].CookingDishId, true)
      };
    case OrderActions.ADD_DISH_SUCCESS:
      var s = {
        ...state,
        dishLoading: _toggleDishLoading(state.dishLoading, action.payload.dish.CookingDishId, false),
        orders: state.orders.map(order => {
          if (order.Id == action.payload.order.Id) {
            return action.payload.order;
          }

          return order;
        }),
        currentOrder: action.payload.order
      }
      return s;
    case OrderActions.ADD_DISH_FAIL:
      return {
        ...state,
        dishLoading: _toggleDishLoading(state.dishLoading, action.payload.dish.CookingDishId, false)
      };

    case OrderActions.REMOVE_DISH:
      return {
        ...state,
        dishLoading: _toggleDishLoading(state.dishLoading, action.payload[0].CookingDishId, true)
      };
    case OrderActions.REMOVE_DISH_SUCCESS:
      return {
        ...state,
        dishLoading: _toggleDishLoading(state.dishLoading, action.payload[0].CookingDishId, false)
      };
    case OrderActions.REMOVE_DISH_FAIL:
      return {
        ...state,
        dishLoading: _toggleDishLoading(state.dishLoading, action.payload[0].CookingDishId, false)
      };

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
  let isChanged = false;
  let currentOrders = state.orders.map(currentOrder => currentOrder);
  for (let orderIndex = 0; orderIndex < orders.length; orderIndex++) {
    const order = orders[orderIndex];
    const currentOrder = currentOrders.find(c => c.Id == order.Id)
    isChanged = _mergeOrder(order, currentOrder, currentOrders).r ? true : isChanged;
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

function _mergeOrder(order: IOrder, currentOrder: IOrder, currentOrders: IOrder[]): { o: IOrder, r: boolean } {
  if (!currentOrder) {
    console.log('new order', order);
    currentOrders.push(order);
    return { o: currentOrder, r: true };
  }

  var r = { o: currentOrder, r: false };
  for (let dishIndex = 0; dishIndex < order.Dishes.length; dishIndex++) {
    const dish = order.Dishes[dishIndex];
    const currentDish = currentOrder.Dishes.find(c => c.CookingDishId == dish.CookingDishId);
    r.r = _mergeDishes(currentDish, dish, currentOrder).r ? true : r.r;
  }

  return r;
}

function _mergeDishes(currentDish: IDish, dish: IDish, currentOrder: IOrder): { o: IOrder, r: boolean } {
  if (!currentDish) {
    console.log('new dish', dish);
    currentOrder.Dishes.push(dish);
    return { o: currentOrder, r: true };
  }

  if (currentDish.State != dish.State) {
    console.log('new dish state', dish);
    currentDish.State = dish.State;
    return { o: currentOrder, r: true };
  }
}

function _toggleDishLoading(loadings: IDishLoading[], id: number, flag: boolean): IDishLoading[] {
  return loadings.map(dl => {
    if (dl.dish.CookingDishId == id) {
      dl.isLoading = flag;
    }

    return dl;
  })
}
