import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { AuthContext } from '../contexts/auth'

const Routes: React.FC = () => {
    const { signed, user } = React.useContext(AuthContext);

    return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;