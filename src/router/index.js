import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blogs from '../components/blog.vue'
import Contents from '../components/contents.vue'
import About from '../components/about.vue'
import BlogContent from '../components/blogContent.vue'
import Login from '../components/login.vue'
import Manage from '../components/manage.vue'
import BlogManage from '../components/manage/blogManage.vue'
import AddBlog from '../components/manage/addBlog.vue'
import CategoryManage from '../components/manage/categoryManage.vue'
import EditBlog from '../components/manage/editBlog.vue'
import CommentsManage from '../components/manage/commentsManage.vue'
import BlogCommentsManage from '../components/manage/blogCommentsManage.vue'
import AccountManage from '../components/manage/accountManage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home, redirect: '/blogs', children:
  [
    { path: '/blogs', component: Blogs },
    { path: '/contents', component: Contents },
    { path: '/about', component: About },
    { path: '/blogcontent/:id', component: BlogContent, props: true }
  ] },
  { path: '/login', component: Login },
  { path: '/manage', component: Manage, redirect: '/addBlog', children:
  [
    { path: '/blogManage', component: BlogManage },
    { path: '/addBlog', component: AddBlog },
    { path: '/categoryManage', component: CategoryManage },
    { path: '/commentsManage', component: CommentsManage },
    { path: '/accountManage', component: AccountManage },
    { path: '/editBlog/:id', component: EditBlog, props: true },
    { path: '/blogCommentsManage/:id', component: BlogCommentsManage, props: true }
  ]}
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes
})

export default router
