// import Constants from "expo-constants";
import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Picker } from "@react-native-picker/picker";


const db = SQLite.openDatabase("db.db");
const Home=({ navigation })=> {
 
  const [Name, setName] = useState('');
  const [Age, setAge] = useState();
  const [Gender, setGender] = useState('');
 
  useEffect(() => {
    db.transaction((txn)=> {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='User_Table'",
        [],
        (tx, res)=> {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS User_Table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS User_Table(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(30), user_Age INT(15), user_gender VARCHAR(255))',
              []
            );
          }
        }
      );
    })
 
  }, []);
 
  const insertData = () => {
 
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO User_Table (user_name, user_Age, user_gender) VALUES (?,?,?)',
          [Name, Age, Gender],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert('Saved');
            } else Alert.alert('Failed');
          }
        );
      });
    
  }
  return (
      <View style={{flex: 1,alignItems: 'center',padding: 10,alignItems:'center',justifyContent:'center'}}>
        
        <View style={{borderColor:'#306e2d',width:'98%',borderWidth:2,padding:20,borderRadius:15,alignItems:'center',justifyContent:'center'}}>
        <Text style={{ fontSize: 24, textAlign: 'center', color: '#000' }}>Login</Text>
 
        <TextInput
          style={{height: 45,width: '90%',textAlign: 'center',borderWidth: 1,borderColor: '#0b1f0c',borderRadius: 7,marginTop: 15,}}
          onChangeText={(text) => setName(text)}
          placeholder="Enter User ID"
          value={Name} />
        <TextInput
          style={{height: 45,width: '90%',textAlign: 'center',borderWidth: 1,borderColor: '#0b1f0c',borderRadius: 7,marginTop: 15,}}
          onChangeText={(data) => setAge(data)}
          placeholder="Enter Your Age"
          keyboardType={'numeric'}
          value={Age} />
 <View style={{borderWidth: 1,borderColor: '#0b1f0c',borderRadius: 7,width: '90%',marginTop:15,marginBottom:15,justifyContent:'center',alignItems:'center'}}>
   <Picker
        selectedValue={Gender}
        onValueChange={(data, index) => {setGender(data)}}
        mode="dropdown"
        style={{width: '90%',height:45}}
      >
        <Picker.Item label="Select Gender" value="Unknown" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Not Willing" value="NA" />
      </Picker>
 </View>
 
        <TouchableOpacity
          style={{ backgroundColor: '#144fcc',alignItems: 'center',borderRadius: 8,justifyContent: 'center',alignItems: 'center',width: '100%'}}
          onPress={insertData}>
          <Text style={{ color: '#FFFFFF',fontSize: 20,textAlign: 'center',padding: 8}}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: '#7f8694',alignItems: 'center',borderRadius: 8,justifyContent: 'center',alignItems: 'center',width: '100%',marginTop:10}}
          onPress={()=>{navigation.navigate('Data')}}>
          <Text style={{ color: '#FFFFFF',fontSize: 20,textAlign: 'center',padding: 8}}>View</Text>
 
        </TouchableOpacity>
 
      </View>
 </View>
  );
};
 

export default Home;
