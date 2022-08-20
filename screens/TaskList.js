import React , { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import firebase from "../database/firebase.js";

const TaskList = (props) => {

  const [tasks, setTasks] = useState([]);

  const changeStatus = async (id) => {
    const dbRef = firebase.collection("tasks").doc(id);
    const doc = await dbRef.get();
    const task = doc.data();
    if(task.status) {
      await dbRef.set({
        description: task.description,
        status: false
      })
    }else {
      await dbRef.set({
        description: task.description,
        status: true
      })
    }
    props.navigation.navigate("TasksList");
  }

  const deleteTask = (id) => {
    firebase.collection("tasks").doc(id).delete();
  }

  useEffect(() => {
    firebase.collection("tasks").onSnapshot((query) => {
      const list = [];
      query.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data(),});
      });
      setTasks(list);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Create Task" onPress={() => props.navigation.navigate("CreateTask")}/>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={tasks}
        renderItem={(item) => {
          return(
          <View style={styles.tasks}>
            
            <TouchableOpacity
                style={styles.deleteTask}
                >
                <Text> {item.item.status === false ? 
                  <FontAwesome  
                    name="star"
                    size={23}
                    color="#EF9B0F"
                    onPress={() => {changeStatus(item.item.id)}}>
                     
                    </FontAwesome> 
                  : 
                    <FontAwesome  
                    name="check"
                    size={23}
                    color="#F92e6A"
                    onPress={() => {changeStatus(item.item.id)}}></FontAwesome>
                  }
                  </Text>
            </TouchableOpacity>
            <Text
                style={styles.DescriptionTask}
                onPress={()=>
                  props.navigation.navigate("TaskDetail", {
                    id: item.item.id,
                    description: item.item.description,
                    status:item.item.status
                  })
                }
              >
              {item.item.description}
            </Text>
            <TouchableOpacity
                style={styles.deleteTask}
                onPress={()=>
                  props.navigation.navigate("TaskDetail", {
                    id: item.item.id,
                    description: item.item.description,
                    status:item.item.status
                  })
                }
                >
                <FontAwesome
                  name="edit"
                  size={23}
                  color="#00572D"
                >
                </FontAwesome>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deleteTask}
                onPress={() => {deleteTask(item.item.id)}}
                >
                <FontAwesome
                  name="remove"
                  size={23}
                  color="#C51021"
                >
                </FontAwesome>
            </TouchableOpacity>

          </View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    paddingTop: 20,
 },
 tasks:{
  width:"90%",
  flexDirection:"row",
  justifyContent:"space-between",
  marginTop:5,
  alignItems: "center",
  paddingLeft: 35
 },
 deleteTask:{
   justifyContent:"center",
   paddingLeft:15,
 },
 DescriptionTask:{
  width:"75%",
  alignContent:"flex-start",
  backgroundColor:"#f5f5f5cf",
  padding:12,
  paddingHorizontal: 20,
  borderRadius:50,
  marginBottom: 5,
  marginLeft:15,
  marginRight:10,
  color:"#282b2db5",
 },
 buttonNewTask:{
  width:60,
  height:60,
  position:"absolute",
  bottom: 30,
  left:20,
  backgroundColor:"#F92e6a",
  borderRadius:50,
  justifyContent:"center",
  alignItems: "center"
 },
 iconButton:{
  color:"#ffffff",
  fontSize:25,
  fontWeight:"bold",
 },
});

export default TaskList;
