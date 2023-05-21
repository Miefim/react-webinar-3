import React, {useCallback} from "react";
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import CartState from "./components/cart-state";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cartList = store.getState().cartList;
  const isVisible = store.getState().isModalVisible;

  const callbacks = {
    onOpenModal: useCallback(() => {
      store.openModal();
    }, [store]),

    onCloseModal: useCallback(() => {
      store.closeModal();
    }, [store]),

    onAddCartItem: useCallback((e) => {
      store.addCartItem(Number(e.target.id));
    }, [store]),

    onDeleteCartItem: useCallback((e) => {
      store.deleteCartItem(Number(e.target.id));
    }, [store]),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <CartState 
        cartList={cartList}
        action={callbacks.onOpenModal} 
        actionsName='Перейти'
      />
      <List 
        list={list} 
        renderItem={(item) => 
          <Item 
            item={item} 
            key={item.code} 
            action={callbacks.onAddCartItem} 
            actionName='Добавить'
          />
        }
      />
      <Modal visible={isVisible} setVisible={callbacks.onCloseModal}>
        <Cart 
          cartList={cartList} 
          onCloseCart={callbacks.onCloseModal}
          onDeleteCartItem={callbacks.onDeleteCartItem}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
