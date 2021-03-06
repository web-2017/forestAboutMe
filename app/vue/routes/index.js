import Vue from "vue";
import VueRouter from "vue-router";

/*---vue components---*/
import About from "../components/aboutContent.vue";
import Blog from "../components/blogContent.vue";
import Work from "../components/workContent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: About
  },
  {
    path: "/blog",
    component: Blog
  },
  {
    path: "/work",
    component: Work
  }
];

const router = new VueRouter({
  routes
});

export default router;
