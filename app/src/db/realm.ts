import Realm from 'realm';
import { TaskSchema } from "../models/Task"

export const getRealm = async () => {
    return await Realm.open({
        schema: [TaskSchema],
        schemaVersion: 1,
    });
}
