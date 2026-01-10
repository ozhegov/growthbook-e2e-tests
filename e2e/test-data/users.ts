import { User } from '../api/types'
import { RUN_ID } from '../config'

export const USERS: User[] = [
    {
        role: 'ADMIN',
        email:
            process.env.ADMIN_EMAIL ||
            `admin@growthbook.local`,
        password: process.env.ADMIN_PASSWORD || 'AdminTest!',
        name: 'Admin User'
    },
    {
        role: 'ENGINEER',
        email:
            process.env.ENGINEER_EMAIL ||
            `engineer_${RUN_ID}@growthbook.local`,
        password: process.env.ENGINEER_PASSWORD || 'EngineerTest!',
        name: 'Engineer User'
    },
    {
        role: 'EXPERIMENTER',
        email:
            process.env.EXPERIMENTER_EMAIL ||
            `experimenter_${RUN_ID}@growthbook.local`,
        password: process.env.EXPERIMENTER_PASSWORD || 'ExperimenterTest!',
        name: 'Experimenter User'
    }
]
