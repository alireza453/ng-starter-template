/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'فیوز',
        subtitle: 'بایگانی فیوز',
        type: 'collapsable',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'dashboards.project',
                title: 'Project',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-document-check',
                link: '/fuse/dashboards/project',
            },
            {
                id: 'dashboards.analytics',
                title: 'Analytics',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/fuse/dashboards/analytics',
            },
            {
                id: 'dashboards.finance',
                title: 'Finance',
                type: 'basic',
                icon: 'heroicons_outline:banknotes',
                link: '/fuse/dashboards/finance',
            },
            {
                id: 'dashboards.crypto',
                title: 'Crypto',
                type: 'basic',
                icon: 'heroicons_outline:currency-dollar',
                link: '/fuse/dashboards/crypto',
            },
            {
                id: 'apps',
                type: 'group',
                icon: 'heroicons_outline:home',
                children: [
                    {
                        id: 'apps.academy',
                        title: 'Academy',
                        type: 'basic',
                        icon: 'heroicons_outline:academic-cap',
                        link: '/fuse/apps/academy',
                    },
                    {
                        id: 'apps.chat',
                        title: 'Chat',
                        type: 'basic',
                        icon: 'heroicons_outline:chat-bubble-bottom-center-text',
                        link: '/fuse/apps/chat',
                    },
                    {
                        id: 'apps.contacts',
                        title: 'Contacts',
                        type: 'basic',
                        icon: 'heroicons_outline:user-group',
                        link: '/fuse/apps/contacts',
                    },
                    {
                        id: 'apps.ecommerce',
                        title: 'ECommerce',
                        type: 'collapsable',
                        icon: 'heroicons_outline:shopping-cart',
                        children: [
                            {
                                id: 'apps.ecommerce.inventory',
                                title: 'Inventory',
                                type: 'basic',
                                link: '/fuse/apps/ecommerce/inventory',
                            },
                        ],
                    },
                    {
                        id: 'apps.file-manager',
                        title: 'File Manager',
                        type: 'basic',
                        icon: 'heroicons_outline:cloud',
                        link: '/fuse/apps/file-manager',
                    },
                    {
                        id: 'apps.mailbox',
                        title: 'Mailbox',
                        type: 'basic',
                        icon: 'heroicons_outline:envelope',
                        link: '/fuse/apps/mailbox',
                        badge: {
                            title: '27',
                            classes: 'px-2 bg-pink-600 text-white rounded-full',
                        },
                    },
                    {
                        id: 'apps.notes',
                        title: 'Notes',
                        type: 'basic',
                        icon: 'heroicons_outline:pencil-square',
                        link: '/fuse/apps/notes',
                    },
                    {
                        id: 'apps.scrumboard',
                        title: 'Scrumboard',
                        type: 'basic',
                        icon: 'heroicons_outline:view-columns',
                        link: '/fuse/apps/scrumboard',
                    },
                    {
                        id: 'apps.tasks',
                        title: 'Tasks',
                        type: 'basic',
                        icon: 'heroicons_outline:check-circle',
                        link: '/fuse/apps/tasks',
                    },
                ],
            },
            {
                id: 'pages',
                type: 'group',
                icon: 'heroicons_outline:document',
                children: [
                    {
                        id: 'pages.activities',
                        title: 'Activities',
                        type: 'basic',
                        icon: 'heroicons_outline:bars-3-bottom-left',
                        link: '/fuse/pages/activities',
                    },
                    {
                        id: 'pages.coming-soon',
                        title: 'Coming Soon',
                        type: 'collapsable',
                        icon: 'heroicons_outline:clock',
                        link: '/fuse/pages/coming-soon',
                        children: [
                            {
                                id: 'pages.coming-soon.classic',
                                title: 'Classic',
                                type: 'basic',
                                link: '/fuse/pages/coming-soon/classic',
                            },
                            {
                                id: 'pages.coming-soon.modern',
                                title: 'Modern',
                                type: 'basic',
                                link: '/fuse/pages/coming-soon/modern',
                            },
                            {
                                id: 'pages.coming-soon.modern-reversed',
                                title: 'Modern Reversed',
                                type: 'basic',
                                link: '/fuse/pages/coming-soon/modern-reversed',
                            },
                            {
                                id: 'pages.coming-soon.split-screen',
                                title: 'Split Screen',
                                type: 'basic',
                                link: '/fuse/pages/coming-soon/split-screen',
                            },
                            {
                                id: 'pages.coming-soon.split-screen-reversed',
                                title: 'Split Screen Reversed',
                                type: 'basic',
                                link: '/fuse/pages/coming-soon/split-screen-reversed',
                            },
                            {
                                id: 'pages.coming-soon.fullscreen',
                                title: 'Fullscreen',
                                type: 'basic',
                                link: '/fuse/pages/coming-soon/fullscreen',
                            },
                            {
                                id: 'pages.coming-soon.fullscreen-reversed',
                                title: 'Fullscreen Reversed',
                                type: 'basic',
                                link: '/fuse/pages/coming-soon/fullscreen-reversed',
                            },
                        ],
                    },
                    {
                        id: 'pages.error',
                        title: 'Error',
                        type: 'collapsable',
                        icon: 'heroicons_outline:exclamation-circle',
                        children: [
                            {
                                id: 'pages.error.404',
                                title: '404',
                                type: 'basic',
                                link: '/fuse/pages/error/404',
                            },
                            {
                                id: 'pages.error.500',
                                title: '500',
                                type: 'basic',
                                link: '/fuse/pages/error/500',
                            },
                        ],
                    },

                    {
                        id: 'pages.maintenance',
                        title: 'Maintenance',
                        type: 'basic',
                        icon: 'heroicons_outline:exclamation-triangle',
                        link: '/fuse/pages/maintenance',
                    },
                    {
                        id: 'pages.pricing',
                        title: 'Pricing',
                        type: 'collapsable',
                        icon: 'heroicons_outline:banknotes',
                        children: [
                            {
                                id: 'pages.pricing.modern',
                                title: 'Modern',
                                type: 'basic',
                                link: '/fuse/pages/pricing/modern',
                            },
                            {
                                id: 'pages.pricing.simple',
                                title: 'Simple',
                                type: 'basic',
                                link: '/fuse/pages/pricing/simple',
                            },
                            {
                                id: 'pages.pricing.single',
                                title: 'Single',
                                type: 'basic',
                                link: '/fuse/pages/pricing/single',
                            },
                            {
                                id: 'pages.pricing.table',
                                title: 'Table',
                                type: 'basic',
                                link: '/fuse/pages/pricing/table',
                            },
                        ],
                    },
                    {
                        id: 'pages.profile',
                        title: 'Profile',
                        type: 'basic',
                        icon: 'heroicons_outline:user-circle',
                        link: '/fuse/pages/profile',
                    },
                    {
                        id: 'pages.settings',
                        title: 'Settings',
                        type: 'basic',
                        icon: 'heroicons_outline:cog-8-tooth',
                        link: '/fuse/pages/settings',
                    },
                ],
            },
            {
                id: 'user-interface',
                type: 'group',
                title: "SAMPLE",
                icon: 'heroicons_outline:rectangle-stack',
                children: [

                    {
                        id: 'user-interface.animations',
                        title: 'Animations',
                        type: 'basic',
                        icon: 'heroicons_outline:play',
                        link: '/fuse/ui/animations',
                    },
                    {
                        id: 'user-interface.cards',
                        title: 'Cards',
                        type: 'basic',
                        icon: 'heroicons_outline:square-2-stack',
                        link: '/fuse/ui/cards',
                    },
                    {
                        id: 'user-interface.icons',
                        title: 'Icons',
                        type: 'collapsable',
                        icon: 'heroicons_outline:bolt',
                        children: [
                            {
                                id: 'user-interface.icons.heroicons-outline',
                                title: 'Heroicons Outline',
                                type: 'basic',
                                link: '/fuse/ui/icons/heroicons-outline',
                            },
                            {
                                id: 'user-interface.icons.heroicons-solid',
                                title: 'Heroicons Solid',
                                type: 'basic',
                                link: '/fuse/ui/icons/heroicons-solid',
                            },
                            {
                                id: 'user-interface.icons.heroicons-mini',
                                title: 'Heroicons Mini',
                                type: 'basic',
                                link: '/fuse/ui/icons/heroicons-mini',
                            },
                            {
                                id: 'user-interface.icons.material-twotone',
                                title: 'Material Twotone',
                                type: 'basic',
                                link: '/fuse/ui/icons/material-twotone',
                            },
                            {
                                id: 'user-interface.icons.material-outline',
                                title: 'Material Outline',
                                type: 'basic',
                                link: '/fuse/ui/icons/material-outline',
                            },
                            {
                                id: 'user-interface.icons.material-solid',
                                title: 'Material Solid',
                                type: 'basic',
                                link: '/fuse/ui/icons/material-solid',
                            },
                            {
                                id: 'user-interface.icons.feather',
                                title: 'Feather',
                                type: 'basic',
                                link: '/fuse/ui/icons/feather',
                            },
                        ],
                    },
                    {
                        id: 'user-interface.page-layouts',
                        title: 'Page Layouts',
                        type: 'collapsable',
                        icon: 'heroicons_outline:rectangle-group',
                        children: [
                            {
                                id: 'user-interface.page-layouts.overview',
                                title: 'Overview',
                                type: 'basic',
                                link: '/fuse/ui/page-layouts/overview',
                            },
                            {
                                id: 'user-interface.page-layouts.empty',
                                title: 'Empty',
                                type: 'basic',
                                link: '/fuse/ui/page-layouts/empty',
                            },
                            {
                                id: 'user-interface.page-layouts.carded',

                                title: 'Carded',
                                type: 'collapsable',
                                children: [
                                    {
                                        id: 'user-interface.page-layouts.carded.fullwidth',
                                        title: 'Fullwidth',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/carded/fullwidth',
                                    },
                                    {
                                        id: 'user-interface.page-layouts.carded.left-sidebar-1',
                                        title: 'Left Sidebar #1',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/carded/left-sidebar-1',
                                    },
                                    {
                                        id: 'user-interface.page-layouts.carded.left-sidebar-2',
                                        title: 'Left Sidebar #2',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/carded/left-sidebar-2',
                                    },
                                    {
                                        id: 'user-interface.page-layouts.carded.right-sidebar-1',
                                        title: 'Right Sidebar #1',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/carded/right-sidebar-1',
                                    },
                                    {
                                        id: 'user-interface.page-layouts.carded.right-sidebar-2',
                                        title: 'Right Sidebar #2',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/carded/right-sidebar-2',
                                    },
                                ],
                            },
                            {
                                id: 'user-interface.page-layouts.simple',
                                title: 'Simple',
                                type: 'collapsable',
                                children: [
                                    {
                                        id: 'user-interface.page-layouts.simple.fullwidth-1',
                                        title: 'Fullwidth #1',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/simple/fullwidth-1',
                                    },
                                    {
                                        id: 'user-interface.page-layouts.simple.fullwidth-2',
                                        title: 'Fullwidth #2',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/simple/fullwidth-2',
                                    },
                                    {
                                        id: 'user-interface.page-layouts.simple.left-sidebar-1',
                                        title: 'Left Sidebar #1',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/simple/left-sidebar-1',
                                    },
                                    {
                                        id: 'user-interface.page-layouts.simple.left-sidebar-2',
                                        title: 'Left Sidebar #2',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/simple/left-sidebar-2',
                                    },
                                    {
                                        id: 'user-interface.page-layouts.simple.left-sidebar-3',
                                        title: 'Left Sidebar #3',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/simple/left-sidebar-3',
                                    },
                                    {
                                        id: 'user-interface.page-layouts.simple.right-sidebar-1',
                                        title: 'Right Sidebar #1',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/simple/right-sidebar-1',
                                    },
                                    {
                                        id: 'user-interface.page-layouts.simple.right-sidebar-2',
                                        title: 'Right Sidebar #2',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/simple/right-sidebar-2',
                                    },
                                    {
                                        id: 'user-interface.page-layouts.simple.right-sidebar-3',
                                        title: 'Right Sidebar #3',
                                        type: 'basic',
                                        link: '/fuse/ui/page-layouts/simple/right-sidebar-3',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'user-interface.typography',
                        title: 'Typography',
                        type: 'basic',
                        icon: 'heroicons_outline:pencil',
                        link: '/fuse/ui/typography',
                    },
                ],
            },
        ],
    },
    {
        id: 'ravan-dashboards',
        title: 'روان یار',
        subtitle: 'منوهای روان یار',
        type: 'collapsable',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'dashboards.home',
                title: 'صفحه اصلی',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-document-check',
                link: '/ravanyar/dashboards/home',
            },
            {
                id: 'dashboards.basedata',
                title: 'ثبت اطلاعات پایه',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-document-check',
                link: '/ravanyar/dashboards/base-data',
            },
        ]
    }

];
