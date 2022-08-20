import React , { useEffect, useState } from "react";
import { StyleSheet,View, TextInput, ScrollView, Button, Alert, Text } from 'react-native';
import firebase from "../database/firebase.js";
import { Checkbox } from 'react-native-paper';

const TaskDetail = (props) => {
  const initialState = {
      id: "",
      description: "",
      status: ""
  }

  const [task, setTask] = useState(initialState);
  const [checked, setChecked] = useState(props.route.params.status);

  const getTaskById = async (id) => {
    const idTask = firebase.collection("tasks").doc(id);
    const doc = await idTask.get();
    const task = doc.data();
    setTask({
      ...task,
      id: doc.id
    })
  }

  const deleteTask = () => {
    firebase.collection("tasks").doc(props.route.params.id).delete();
    props.navigation.navigate("TasksList");
  }

  const updateTask = async () => {
    const dbRef = firebase.collection("tasks").doc(props.route.params.id);
    let statusTask = false;
    if(checked == true) {
      statusTask = true
    }
    await dbRef.set({
      description: task.description,
      status: statusTask
    })
    setTask(initialState);
    props.navigation.navigate("TasksList");
  }

  const handleChangeText = (taskInput, value) => {
    setTask({ ...task, [taskInput]: value})
  }

  const openConfirmationAlert = () => {
    Alert.alert("Remove the User", "Are you sure?", [
      {text: 'Yes', onPress: () => deleteTask()},
      {text: 'No', onPress: () => console.log(false)},
    ])
  }

  useEffect(() => {
    getTaskById(props.route.params.id)
  }, []);

    return (
      <ScrollView style = {styles.container}>
        <View style = {styles.input}>
          <TextInput 
              placeholder="My Task is ..." 
              value={task.description}
              onChangeText={(value) => handleChangeText( "description" , value )}
          />
        </View>
        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>Status</Text>
        </View>
        <View>
          <Button 
          title="Update" 
          onPress={() => updateTask()} 
          />
        </View>
        <View>
          <Button 
          title="Delete" 
          color={"#E37399"}
          onPress={() => openConfirmationAlert()} 
          />
        </View>
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  input: {
    flex:1,
    padding:0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
})

export default TaskDetail;