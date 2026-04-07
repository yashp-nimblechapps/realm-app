import { getRealm } from '../db/realm';

// CREATE
export const addTask = async (title: any) => {
  const realm = await getRealm();

  realm.write(() => {
    realm.create('Task', {
      _id: Date.now(),
      title,
      isCompleted: false,
    });
  });

  realm.close();
};

// READ
export const getTasks = async () => {
  const realm = await getRealm();
  const tasks = realm.objects('Task');

  return [...tasks]; // convert to normal array
};

// UPDATE (toggle complete)
export const toggleTask = async (taskId: any) => {
  const realm = await getRealm();

  realm.write(() => {
    const task = realm.objectForPrimaryKey('Task', taskId);
    if (task) {
      task.isCompleted = !task.isCompleted;
    }
  });

  realm.close();
};

// DELETE
export const deleteTask = async (taskId: any) => {
  const realm = await getRealm();

  realm.write(() => {
    const task = realm.objectForPrimaryKey('Task', taskId);
    if (task) {
      realm.delete(task);
    }
  });

  realm.close();
};