import React from "react";

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Screen
import TaskList from "./screens/TaskList";
import CreateTask from "./screens/CreateTask";
import TaskDetail from "./screens/TaskDetail";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TasksList"
        component={TaskList}
        options={{title: "Tasks List"}}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTask}
        options={{title: "Create Task"}}
      />
       <Stack.Screen
        name="TaskDetail"
        component={TaskDetail}
        options={{title: "Detail Task"}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
