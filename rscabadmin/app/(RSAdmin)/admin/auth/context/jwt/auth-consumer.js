'use client';

import PropTypes from 'prop-types';
// components
import { SplashScreen } from '@/app/(RSAdmin)/admin/common/loading-screen';
//
import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

export function AuthConsumer({ children }) {
  return (
    <AuthContext.Consumer>
      {(auth) => (auth.loading ? <SplashScreen /> : children)}
    </AuthContext.Consumer>
  );
}

AuthConsumer.propTypes = {
  children: PropTypes.node,
};
