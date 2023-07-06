import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus,IconMail,IconUser, IconUsers,IconCalendarEvent,IconList,
} from '@tabler/icons';

// import { uniqueId } from 'lodash';

const Menuitems = [
  // {
  //   navlabel: true,
  //   // subheader: 'Home',  
    
  // },

  {
    // id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard/home',
  },

  {
    // id: uniqueId(),
    title: 'Quotation ',
    icon: IconTypography,
    href: '/dashboard/agreement',
  },
  {
    // id: uniqueId(),
    title: 'Quotation List ',
    icon: IconList,
    href: '/dashboard/agreementlist',
  },
  {
    // id: uniqueId(),
    title: 'Contract',
    icon: IconCopy,
    href: '/dashboard/Contract',
  },
  {
    // id: uniqueId(),
    title: 'Customers',
    icon: IconUsers,
    href: '/dashboard/Customer',
  },
  {
    // id: uniqueId(),
    title: 'Sales Persons',
    icon: IconUser,
    href: '/dashboard/salesperson',
  },
  {
    // id: uniqueId(),
    title: ' Mail',
    icon: IconMail,
    href: '/dashboard/Mail',
  },
  {
    // id: uniqueId(),
    title: 'Clickup',
    icon: IconCalendarEvent,
    href: '/dashboard/Clickup',
  },
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  // {
  //   // id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/register',
  // },
  
];

export default Menuitems;
