

import { MessagesMockApi } from 'app/mock-api/common/messages/api';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { NotificationsMockApi } from 'app/mock-api/common/notifications/api';
import { SearchMockApi } from 'app/mock-api/common/search/api';
import { ShortcutsMockApi } from 'app/mock-api/common/shortcuts/api';
import { UserMockApi } from 'app/mock-api/common/user/api';
import { IconsMockApi } from 'app/mock-api/ui/icons/api';
import { LoginHistoryMockApi } from './common/signin-history/api';
import { ChatMockApi } from './common/chat/api';

export const mockApiServices = [
    IconsMockApi,
    MessagesMockApi,
    NavigationMockApi,
    NotificationsMockApi,
    SearchMockApi,
    ShortcutsMockApi,
    UserMockApi,
    LoginHistoryMockApi,
    ChatMockApi
];
