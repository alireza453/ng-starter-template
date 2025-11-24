/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [

    {
        id: 'ravan-dashboards',
        title: 'روان یار',
        subtitle: 'داشبورد روان یار',
        type: 'collapsable',
        icon: 'fa-light fa-house',
        children: [
            {
                id: 'dashboards.home',
                title: 'صفحه اصلی',
                type:'basic',
                icon: 'fa-light fa-house',
                link: 'dashboard/home',
            },
            {
                id: 'dashboards.basedata',
                title: 'ثبت اطلاعات پایه',
                type: 'basic',
                icon: 'fa-light fa-database',
                link: 'dashboard/base-data',
            },
        ]
    }

];
