/* eslint-disable */
import { LoginHistoryModel } from 'app/modules/auth/signin-history/sign-in-history.model';
import { DateTime } from 'luxon';


/* Get the current instant */
const now = DateTime.now();

export const LoginHistoryData:LoginHistoryModel[] = [
    {
        id: '832276cc-c5e9-4fcc-8e23-d38e2e267bc9',
        ip: '127.0.0.1',
        time: now.toISO(),
        status: "success",
    },
    {
        id: '832276cc-c5e9-4fcd-8e23-d38e2e267bc9',
        ip: '127.0.0.1',
        time: now.toISO(),
        status: "success",
    },
    {
        id: '832276cc-c5e9-4ffc-8e23-d38e2e267bc9',
        ip: '127.0.0.1',
        time: now.toISO(),
        status: "fail",
    },
    {
        id: '832276cc-c5e9-4fcc-8e23-f38e2e267bc9',
        ip: '127.0.0.1',
        time: now.toISO(),
        status: "success",
    },
];
