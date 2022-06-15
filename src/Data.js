// import Constants from "expo-constants";
import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, FlatList } from 'react-native';
 const db = SQLite.openDatabase("db.db");

const Data=({ navigation })=> {
 
  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState([]);
 
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM User_Table',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setItems(temp);
 
          if (results.rows.length >= 1) {
            setEmpty(false);
          } else {
            setEmpty(true)
          }
 
        }
      );
 
    });
  }, []);
 
  const listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000'
        }}
      />
    );
  };
 
  const emptyMSG = (status) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
 
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
          No Record Inserted Database is Empty...
          </Text>
 
      </View>
    );
  }
 
 const showData=({ item })=>
 {
  return(
           <View key={item.student_id} style={{ padding: 20 }}>

              <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                <Text style={{width:'50%'}}> Id  =></Text><Text>{item.user_id} </Text>
              </View>
               <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                <Text style={{width:'50%',alignSelf:'center'}}> Name  =></Text><Text>{item.user_name} </Text>
              </View>
               <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                <Text style={{width:'50%',alignSelf:'center'}}> Age  =></Text><Text>{item.user_Age} </Text>
              </View>
               <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                <Text style={{width:'50%',alignSelf:'center'}}>Gender  =></Text><Text>{item.user_gender} </Text>
              </View>   
          </View>
              )
 }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
      <Text style={{textAlign:'center',fontSize:20,marginBottom:15}}> All Data</Text>
        {empty ? emptyMSG(empty) :
 
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={showData}
          />
        }
      </View>
    </SafeAreaView>
 
  );
}


export default Data;


