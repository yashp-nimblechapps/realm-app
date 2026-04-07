import { Button, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
//import { addTask, deleteTask, getTasks, toggleTask } from '../services/taskService';
import { useRealm, useQuery } from '@realm/react';

export default function HomeScreen() {
  const realm = useRealm();
  const tasks = useQuery<any>('Task');

  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;

    realm.write(() => {
      realm.create('Task', {
        _id: Date.now(),
        title: input,
        isCompleted: false,
      });
    });

    setInput('');
  };

  const handleToggle = (id: any) => {
    realm.write(() => {
      const task = realm.objectForPrimaryKey('Task', id);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    });
  };

  const handleDelete = (id: any) => {
    realm.write(() => {
      const task = realm.objectForPrimaryKey('Task', id);
      if (task) {
        realm.delete(task);
      }
    });
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 30 }}>
      <Text 
        style={{textAlign: "center", fontSize: 22, fontWeight: "bold", marginBottom: 30}}
      >
        Realm - Local Mobile Database
      </Text>

      
      {/* Input */}
      <TextInput
        placeholder="Enter task..."
        value={input}
        onChangeText={setInput}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
          borderRadius: 5,
        }}
      />

      <Button title="Add Task" onPress={handleAdd} />

      {/* List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id.toString()}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity onPress={() => handleToggle(item._id)}>
              <Text style={{ fontSize: 16 }}>
                {item.title} {item.isCompleted ? '✅' : '❌'}
              </Text>
            </TouchableOpacity>

            <Button title="Delete" onPress={() => handleDelete(item._id)} />
          </View>
        )}
      />
    </View>
  );
}
