import React , { useState } from "react";
import { StyleSheet,View, TextInput, ScrollView, Button } from 'react-native';
import firebase from "../database/firebase.js";

const CreateTask = (props) => {

    const [task, setTask] = useState({
      description: "",
      status: ""
    })


    const handleChangeText = (taskInput, value) => {
      setTask({ ...task, [taskInput]: value})
    }


    const saveTodo = () => {
      if (task.description === '') {
        alert('Please provide a task');
      }else {
        try {
          firebase.collection("tasks").add({
            description: task.description,
            status: false
        });
        props.navigation.navigate("TasksList");
        } catch (error) {
          alert('Error!');
          console.log(error);
        }
      }
    }


    return (
      <ScrollView style = {styles.container}>
        <View style = {styles.input}>
          <TextInput 
              placeholder="My Task is ..." 
              onChangeText={(value) => handleChangeText( "description" , value )}
          />
        </View>
        <View>
          <Button title="Create" onPress={() => saveTodo()} />
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

export default CreateTask;