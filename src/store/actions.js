import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type'



export default {
  addCart(context, payload) {
    //payload新添加的商品
    let oldProduct = context.state.cartList.find(item =>
      item.iid === payload.iid
    )
    //判断oldProduct,如果有则仅仅count + 1,如果没有则为新增，count=1,且新加入该商品
    if (oldProduct) {
      // oldProduct.count += 1;
      context.commit(ADD_COUNTER, oldProduct)
    }
    else {
      payload.count = 1;
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}