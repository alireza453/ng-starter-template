/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [

    {
        id: 'ravan-dashboards',
        title: 'روان یار',
        subtitle: 'داشبورد روان یار',
        type: 'collapsable',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'dashboards.home',
                title: 'صفحه اصلی',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-document-check',
                link: '/admin/home',
            },
            {
                id: 'dashboards.basedata',
                title: 'ثبت اطلاعات پایه',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-document-check',
                link: '/admin/base-data',
            },
        ]
    }

];
