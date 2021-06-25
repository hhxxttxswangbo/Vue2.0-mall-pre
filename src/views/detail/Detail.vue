<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" />
    <detail-swiper :top-images="topImages" />
    <detail-base-info :goods="goods" />
    <detail-shop-info :shop="shop" />
    <detail-goods-info :detailInfo="detailInfo" />
    <detail-param-info :paramInfo="paramInfo" />
    <detail-comment-info :commentInfo="commentInfo" />
    <goods-list :goods="recommend" />
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

export default {
  //name属性一定要有，否则keep-alive里的excluSde没用
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
    };
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      //3.//使用类整合详情页轮播图下面的数据,即商品信息数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services,
      );

      //4.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      //5.获取商品详细信息
      this.detailInfo = data.detailInfo;

      //6.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //7.获取评论的信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }

      //8.获取推荐的信息
      getRecommend().then((res) => {
        // console.log(res);
        this.recommend = res.data.list;
      });
    });
  },
  methods: {
    addToCart() {
      //1.获取购物车里需要展示的信息
      const product = {};
      product.images = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //将商品添加到购物车里,使用VueX
      // this.$store.commit("addCart", product);  mutations调用方法
      this.$store.dispatch("addCart", product);
    },
  },
};
</script>

<style scoped>
.detail-nav {
  background-color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
</style>