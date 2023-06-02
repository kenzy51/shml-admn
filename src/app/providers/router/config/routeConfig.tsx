import { RouteProps } from 'react-router-dom';
import React from 'react';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from '../../../../pages/ProfilePage';
import { AppRoutes } from './types';
import { LoginPage } from 'pages/LoginPage';
import CreateEventsPage from 'pages/CreateEventsPage/ui/CreateEventsPage';
import { EventDetail } from 'widgets/EventDetail';
import { PostDetail } from 'widgets/PostDetail';
import { Comments } from 'widgets/Comments';
import { ChatAdmin } from 'widgets/ChatAdmin';
import { UsersList } from 'widgets/UsersList';
import { Organization } from 'widgets/Organization';
import { ProgramDetail } from 'widgets/ProgramDetail';
import { CampDetail } from 'widgets/CampDetail/ui/CampDetail';
import { UserNotifications } from 'pages/UserNotifications';
import PartnerPage from 'pages/PartnerPage/ui/PartnerPage';

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PROFILE]: '/profile',
  // последний
  [AppRoutes.NOT_FOUND]: '*',
  [AppRoutes.CREATE_EVENTS]: '/createEvents',
  [AppRoutes.EVENT_DETAIL]: '/event/:eventId',
  [AppRoutes.POST_DETAIL]: '/post/:postId',
  [AppRoutes.COMMENTS]: '/post/:postId/comment',
  // [AppRoutes.CHAT_ADMIN]: '/chat',
  [AppRoutes.USERS]: '/users',
  [AppRoutes.ORGANIZATION]: '/organization/:companyId',
  [AppRoutes.PROGRAM_DETAIL]: '/program/:programId',
  [AppRoutes.CAMP_DETAIL]: '/camp/:campId',
  [AppRoutes.USER_NOTIFICATION]: '/user-notifications',
  [AppRoutes.PARTNER_PAGE]: '/partner/:partnerId'
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <MainPage />,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.PROFILE,
    element: <ProfilePage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.NOT_FOUND,
    element: <NotFoundPage />,
  },
  [AppRoutes.CREATE_EVENTS]: {
    path: RoutePath.CREATE_EVENTS,
    element: <CreateEventsPage />
  },
  [AppRoutes.EVENT_DETAIL]: {
    path: RoutePath.EVENT_DETAIL,
    element: <EventDetail />
  },
  [AppRoutes.POST_DETAIL]: {
    path: RoutePath.POST_DETAIL,
    element: <PostDetail />
  },
  [AppRoutes.COMMENTS]: {
    path: RoutePath.COMMENTS,
    element: <Comments />
  },
  // [AppRoutes.CHAT_ADMIN]: {
  //   path: RoutePath.CHAT_ADMIN,
  //   element: <ChatAdmin />
  // },
  [AppRoutes.USERS]: {
    path: RoutePath.USERS,
    element: <UsersList />
  },
  [AppRoutes.ORGANIZATION]: {
    path: RoutePath.ORGANIZATION,
    element: <Organization />
  },
  [AppRoutes.PROGRAM_DETAIL]: {
    path: RoutePath.PROGRAM_DETAIL,
    element: <ProgramDetail />
  },
  [AppRoutes.CAMP_DETAIL]: {
    path: RoutePath.CAMP_DETAIL,
    element: <CampDetail />
  }, 
  [AppRoutes.USER_NOTIFICATION]: {
    path: RoutePath.USER_NOTIFICATION,
    element: <UserNotifications />
  }, 
  [AppRoutes.PARTNER_PAGE]: {
    path: RoutePath.PARTNER_PAGE,
    element: <PartnerPage />
  },
};

export const routeConfigPublic = {
  [AppRoutes.MAIN]: {
    path: RoutePath.MAIN,
    element: <LoginPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.NOT_FOUND,
    // TODO: Plug component <AuthorizationNeeded />
    element: <NotFoundPage />,
  },
}






