export const translateEvents: Record<any, string> = {
  "order.created.event": "Заказ создан",
  "order.payed.event": "Заказ оплачен",
  "order.ready_for_pickup.event": "Заказ готов к выдаче",
  "order.completed.event": "Заказ завершен",
  "order.canceled.event": "Заказ отменен",
  "product.created.event": "Товар создан",
  "product.updated.event": "Товар обновлен",
  "menu.created.event": "Меню создан",
  "menu.activated.event": "Меню активировано",
  "menu.deactivated.event": "Меню деактивировано",
  "menu.items-updated.event": "Изменен состав меню",
  "payment.created.event": "Платеж создан",
  "payment.fulfilled.event": "Платеж проведен",
  "payment.refunded.event": "Платеж возвращен",
  "payment.rejected.event": "Платеж отказан",
  "stock.created.event": "Куча навалена",
  "stock.quantity-changed.event": "Куча изменена",
  "cooking-request.created.event": "Запрос на приготовление создан",
  "cooking-request.ready.event": "Запрос на приготовление выполнен",
  "cooking-request.rejected.event": "Запрос на приготовление отклонен",
};

export enum OrderEventNames {
  orderCreated = "order.created.event",
  orderPayed = "order.payed.event",
  orderReadyForPickup = "order.ready_for_pickup.event",
  orderCompleted = "order.completed.event",
  orderCanceled = "order.canceled.event",
  orderSnapshot = "order.snapshot.event",
}

export enum ProductEventNames {
  productCreated = "product.created.event",
  productUpdated = "product.updated.event",
  productSnapshot = "product.snapshot.event",
}

export enum MenuEventNames {
  menuCreated = "menu.created.event",
  menuActivated = "menu.activated.event",
  menuDeactivated = "menu.deactivated.event",
  menuItemsUpdated = "menu.items-updated.event",
  menuSnapshot = "menu.snapshot.event",
}

export enum PaymentEventNames {
  paymentCreated = "payment.created.event",
  paymentFulfilled = "payment.fulfilled.event",
  paymentRefunded = "payment.refunded.event",
  paymentRejected = "payment.rejected.event",
  paymentSnapshot = "payment.snapshot.event",
}

export enum CookingStockEventNames {
  stockCreated = "stock.created.event",
  stockQuantityChanged = "stock.quantity-changed.event",
  stockSnapshot = "stock.snapshot.event",
}

export enum CookingRequestEventNames {
  requestCreated = "cooking-request.created.event",
  requestReady = "cooking-request.ready.event",
  requestRejected = "cooking-request.rejected.event",
  requestSnapshot = "cooking-request.snapshot.event",
}
