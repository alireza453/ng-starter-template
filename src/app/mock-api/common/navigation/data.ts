/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [

    {
        id: 'dashboards.home',
        title: 'صفحه اصلی',
        type:'basic',
        icon: 'fa-light fa-house',
        link: 'dashboard/home',
    },
    {
        id: 'ravan-dashboards',
        title: 'مدیریت سامانه',
        subtitle: 'داشبورد روان یار',
        type: 'collapsable',
        children: [

            {
                id: 'dashboards.baseinfo',
                title: 'ثبت اطلاعات پایه',
                type: 'basic',
                icon: 'fa-light fa-database',
                link: 'dashboard/base-info',
            },
            {
                id: 'dashboards.usermanagement',
                title: 'مدیریت کاربران',
                type: 'basic',
                icon: 'fa-light fa-user',
                link: 'dashboard/user-management',
            },
            {
                id: 'dashboards.rolemanagement',
                title: 'مدیریت نقش ها',
                type: 'basic',
                icon: 'fa-light fa-user',
                link: 'dashboard/roles-management',
            },
        ]
    },


];
