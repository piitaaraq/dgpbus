// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';  // Ensure the paths are correct
import AboutPage from '../views/AboutPage.vue'; // Ensure the paths are correct
import HospitalForm from '../views/HospitalForm.vue'; // Import HospitalForm component
import ConfirmForm from '../views/ConfirmForm.vue';
import HospitalList from '@/views/HospitalList.vue';
import EditForm from '../views/EditForm.vue';
import RidesToday from '../views/RidesToday.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import BusSchedules from '@/views/BusSchedules.vue';
import TaxiUsers from '@/views/TaxiUsers.vue';
import RegisteredRides from '@/views/RegisteredRides.vue';
import DriverView from '@/views/DriverView.vue';
import TranslatorView from '@/views/TranslatorView.vue';
import PendingApprovals from '@/views/PendingApprovals.vue';
// import axios from 'axios';


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    
  },
  {
  path: '/login',
  name: 'LoginPage',
  component: () => import('@/views/LoginPage.vue'),
  meta: {
    breadcrumbs: [
      { name: "home", link: "/" },
      { name: "login", }
    ]
  }
  },
  {
  path: '/registrer',
  name: 'RegisterUser',
  component: () => import('@/views/Register.vue'),
  meta: {
    breadcrumbs: [
      { name: "home", link: "/" },
      { name: "register" }
    ]
  }
  },
  {
  path: '/admin/pending-approvals',
  name: 'PendingApprovals',
  component: PendingApprovals,
  meta: { 
    requiresAuth: true,
    breadcrumbs: [
      { name: "home", link: "/" },
      { name: "dashboard", link: "/dashboard" },
      { name: "approve" }
    ] 
  }, 

  },
  {
    path: '/hospitals',
    name: 'HospitalList',
    component: HospitalList,
    meta: {
      breadcrumbs: [
      { name: "home", link: "/" },
      { name: "hospitals" }
      ]
    }
  },
  {
    path: '/hospital/:id', // Dynamic route for HospitalForm with :id as a parameter
    name: 'HospitalForm',
    component: HospitalForm,
    props: true, // Pass the route parameters as props to the component
    meta: {
      breadcrumbs: [
        { name: "home", link: "/" },
        { name: "hospitals", link: "/hospitals" },
        { name: "hospitalform" }
      ]
    }
  },
  {
  path: '/confirm',
  name: 'ConfirmForm',
  component: ConfirmForm,
  props: route => ({
    formData: route.params.formData,
    busTime: route.params.busTime
  }),
  meta: {
    breadcrumbs: [
      { name: "home", link: "/" },
      { name: "hospitals", link: "/hospitals" },
      { name: "confirmform" },
    ]

  }
  },
  {
    path: '/rides-today',
    name: 'RidesToday',
    component: RidesToday,
    meta: {
      breadcrumbs: [
        { name: "home", link: "/" },
        { name: "dashboard", link: "/dashboard" },
        { name: "ridestoday" }
      ]
    }
  },
  {
    path: '/edit/:userId',
    name: 'EditForm',
    component: EditForm,
    props: true,
    meta: {
      breadcrumbs: [
        { name: "home", link: "/" },
        { name: "dashboard", link: "/dashboard" },
        { name: "edit" }
      ]
    }
    
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage, // Reference the correct component
    meta: {
      breadcrumbs: [
        { name: "home", link: "/" },
        { name: "about"}
      ]
    }
  },
  {
    path: '/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { 
      requiresStaff: true,
      breadcrumbs: [
        { name: "home", link: "/" },
        { name: "dashboard" }
      ]
    },
  },
  {
    path: '/bus-schedules',
    name: 'BusSchedules',
    component: BusSchedules,
    meta: {
      breadcrumbs: [
        { name: "home", link: "/" },
        { name: "dashboard", link: "/dashboard" },
        { name: "schedules"}
      ]
    }
  },
  {
    path: '/taxi-users',
    name: 'TaxiUsers',
    component: TaxiUsers,
    meta: { requiresStaff: true,
    breadcrumbs: [
      { name: "home", link: "/" },
      { name: "dashboard", link: "/dashboard" },
      { name: "taxi" }
      ]
     },
  },
  {
    path: '/translators',
    name: 'TranslatorView',
    component: TranslatorView,
    meta: { requiresStaff: true,
    breadcrumbs: [
      { name: "home", link: "/" },
      { name: "dashboard", link: "/dashboard" },
      { name: "translators" }
      ]
     },  
  },
  {
    path: '/registered-rides',
    name: 'RegisteredRides',
    component: RegisteredRides,
    meta: { requiresStaff: true,
    breadcrumbs: [
      { name: "home", link: "/" },
      { name: "dashboard", link: "/dashboard" },
      { name: "rides" }
      ]
     },
  },
  {
    path: '/driver-view',
    name: 'DriverView',
    component: DriverView,
    meta: { requiresStaff: true,
    breadcrumbs: [
      { name: "home", link: "/" },
      { name: "dashboard", link: "/dashboard" },
      { name: "drivers" }
      ]

     },
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Check if the route requires staff permissions
  if (to.matched.some(record => record.meta.requiresStaff)) {
    const token = sessionStorage.getItem('token');  // Get the token from localStorage
    if (!token) {
      // If no token is found, redirect to the login page
      return next('/login');
    } else {
      // Verify token and user role if necessary (optional)
      next();
    }
  } else {
    // If route does not require authentication, just proceed
    next();
  }
});

export default router;
