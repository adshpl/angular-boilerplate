import { RoutePaths } from 'constants/route-path';
import { HomePage } from 'pages/home/home.page';
import { SignInPage } from 'pages/signIn/signIn.page';
import { NotFoundPage } from 'pages/not-found/not-found.page';
import { SignUpPage } from 'pages/signUp/signUp.page';

const {
  HOME, SIGN_IN, SIGN_UP, NOT_FOUND,
} = RoutePaths;

export const Routes = [{
  path: HOME,
  component: HomePage,
}, {
  path: SIGN_IN,
  component: SignInPage,
}, {
  path: SIGN_UP,
  component: SignUpPage,
}, {
  path: NOT_FOUND,
  component: NotFoundPage,
}];
