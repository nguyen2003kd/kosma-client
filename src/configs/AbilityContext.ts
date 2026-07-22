'use client';

import { createContext } from 'react';
import { Ability } from '@casl/ability';
import type { AppAbility } from './acl';

const defaultAbility = new Ability([]) as AppAbility;

export const AbilityContext = createContext<AppAbility>(defaultAbility);
