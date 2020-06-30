import { useAuth0 as real } from '@auth0/auth0-react';
import config from './config.json';
import { useAuth0 as stub } from './test/auth0/AuthStub';

export const useAuth0 = () => (config.auth0.enabled ? real() : stub());
