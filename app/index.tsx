import React from "react";
import { RealmProvider } from '@realm/react';
import { TaskSchema } from "./src/models/Task";

import HomeScreen from "./src/screens/HomeScreen";

export default function Index() {
  return (
    <RealmProvider schema={[TaskSchema]} schemaVersion={1}>
      <HomeScreen />
    </RealmProvider>
  );
}
