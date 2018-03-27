import { GroupJson } from './GroupJson';

export interface PassiveTreeJson {
    groups: {
        [key: string]: GroupJson
    }
}
