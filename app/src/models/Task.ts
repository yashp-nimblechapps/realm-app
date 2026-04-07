import Realm from 'realm';

export const TaskSchema: Realm.ObjectSchema = {
  name: 'Task',
  primaryKey: '_id',
  properties: {
    _id: 'int',
    title: 'string',
    isCompleted: { type: 'bool', default: false },
    createdAt: { type: 'date', default: () => new Date() }
  }
};