// Here you probably want to add abstractions of libraries or utilities

// for example if you were using Sanity as your CMS you might want to add:
// sanity.ts -> methods to interact with Sanity CMS
import { getDateCompare } from './date';
import { fetcher } from './fetcher';
import { logError, logInfo } from './logger';
import { prismaDB } from './prismaDB';
import { displayNumbers } from './utils';

export { displayNumbers, fetcher, getDateCompare, logError, logInfo, prismaDB };
