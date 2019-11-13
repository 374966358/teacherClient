import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 登录后跳转页面
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 登录页面
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 自动登录页面
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  // 404错误页面
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  // 401错误页面
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  // 个人中心页面
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  },
  // 上课
  {
    path: '/school',
    component: () => import('@/views/school.vue'),
    hidden: true
  }
]

export const asyncRoutes = [
  // 我的班级
  {
    path: '/grading',
    component: Layout,
    redirect: '/grading',
    alwaysShow: true, // will always show the root menu
    name: 'myGrading',
    meta: {
      title: 'myGrading',
      icon: 'lock'
    },
    children: [
      // 我的老师
      {
        path: 'teacher',
        component: () => import('@/views/grading/teacher'),
        name: 'myTeacher',
        meta: { title: 'myTeacher' }
      },
      // 我的同学
      {
        path: 'classmate',
        component: () => import('@/views/grading/classmate'),
        name: 'myClassmate',
        meta: { title: 'myClassmate' }
      },
      // 上课资料
      {
        path: 'info',
        component: () => import('@/views/grading/info'),
        name: 'classInfo',
        meta: { title: 'classInfo' }
      }
    ]
  },
  // 课程表
  {
    path: '/course',
    component: Layout,
    redirect: '/course',
    alwaysShow: true, // will always show the root menu
    name: 'classSchedule',
    meta: {
      title: 'classSchedule',
      icon: 'lock'
    },
    children: [
      // 课程安排
      {
        path: 'arrange',
        component: () => import('@/views/course/arrange'),
        name: 'courseArrange',
        meta: { title: 'courseArrange' }
      },
      // 课程表
      {
        path: 'table',
        component: () => import('@/views/course/table'),
        name: 'classTable',
        meta: { title: 'classTable' }
      },
      // 回放课程
      {
        path: 'playback',
        component: () => import('@/views/course/playback'),
        name: 'playbackCourse',
        meta: { title: 'playbackCourse' }
      },
      // 出勤情况
      {
        path: 'attendance',
        component: () => import('@/views/course/attendance'),
        name: 'Attendance',
        meta: { title: 'Attendance' }
      }
    ]
  },
  // 问题
  {
    path: '/problem',
    component: Layout,
    redirect: '/problem',
    alwaysShow: true, // will always show the root menu
    name: 'problem',
    meta: {
      title: 'problem',
      icon: 'lock'
    },
    children: [
      // 问答大厅
      {
        path: 'hall',
        component: () => import('@/views/problem/hall'),
        name: 'problemHall',
        meta: { title: 'problemHall' }
      },
      // 我的提问
      {
        path: 'question',
        component: () => import('@/views/problem/question'),
        name: 'myQuestion',
        meta: { title: 'myQuestion' }
      },
      // 我的回答
      {
        path: 'reply',
        component: () => import('@/views/problem/reply'),
        name: 'myReply',
        meta: { title: 'myReply' }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
