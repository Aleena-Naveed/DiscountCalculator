import { StatusBar } from 'expo-status-bar';
import React, {useState, useLayoutEffect, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight, ScrollView, Modal, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

function StartScreen({navigation, route}){
  
  const[getAmount, setAmount] = useState("");
  const[getDiscount, setDiscount] = useState("");

  const[getSavedAmount, setSavedAmount] = useState("");
  const[getDiscountedAmount, setDiscountedAmount] = useState("");

  const [getList, setList] = useState([]);

  // React.useEffect(() => {
  //   if (route.params?.returnList) {
  //     setList(route.params.returnList);
  //     route.params = {};
  //   }
  //   }, [route.params?.returnList]);

const Disc = (val)=>{
  if(Number(val)<0 || Number(val)>100){
    alert("Invalid Discount %")
    setDiscount("");
  }
  else{
    setDiscount(val);
  }
}

const calcDiscount = () =>{
  const discResult = (Number(getAmount) - Number(getAmount) * (Number(getDiscount) / 100)).toFixed(2);
  setDiscountedAmount(String(discResult));
  const saveResult = ((Number(getAmount) - discResult).toFixed(2));
  setSavedAmount(String(saveResult));
}

const histRecord = ()=>{
  const calculations = [
    getAmount,
    getDiscount,
    getDiscountedAmount,
    getSavedAmount,
  ];
  setList([
    ...getList,
    {key: Math.random().toString(),
    data: calculations}
  ]);
  setAmount('');
  setDiscount('');
  setDiscountedAmount('');
  setSavedAmount('');
}
 
navigation.setOptions({
  headerRight: () => (
    <View style={{ paddingRight: 10 }}>
      <FontAwesome
        name="history"
        size={24}
        color="black"
        onPress={() => navigation.navigate('History', {newHistory: getList})}
      />
    </View>
  ),
});

  return(
    <View style={styles.container}>
    {/* <Text style={styles.title}>"DISCOUNT CALCULATOR"</Text> */}
    <View style={styles.InputContainer}>

      <View style={styles.inner}>
        <Text style={styles.InputHeading}>Original Amount</Text>
        <TextInput
          style={styles.TextInput}
          keyboardType = "number-pad"
          value={getAmount}
          onChangeText={(val) => setAmount((val))}
          placeholder= "Enter Original Amount"
        />
      </View>
      
      <View style={styles.inner}>
        <Text style={styles.InputHeading}>Discount %</Text>
        <TextInput
          style={styles.TextInput}
          keyboardType = "number-pad"
          value={getDiscount}
          onChangeText={(val) => Disc(val)}
          placeholder= "Enter Discount %"
        />
      </View>

      <View style={styles.inner}>
        <Text style={styles.InputHeading}>Saved Amount</Text>
        <TextInput
          style={styles.TextInput}
          editable={false}
          value={getSavedAmount}
          placeholder= "Your Saved Amount"
        />
      </View>

      <View style={styles.inner}>
        <Text style={styles.InputHeading}>Discounted Amount</Text>
        <TextInput
          style={styles.TextInput}
          editable={false}
          value={getDiscountedAmount}
          placeholder= "Your Discounted Amount"
        />
      </View>
    
    </View>

    <View style={styles.btnView}>
      <TouchableOpacity
      style={{...styles.btn, backgroundColor: "#C06C84" }}
      onPress={() => calcDiscount()}
      >
        <Text style={styles.btnText}>Calculate Discount</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.btnView}>
      <TouchableOpacity
      style={{...styles.btn, 
        backgroundColor: (getAmount.length===0 || getDiscount.length===0 || getDiscountedAmount.length===0) ? 'grey' : "#C06C84" }}
      onPress={() => histRecord()}
      disabled={(getAmount.length===0 || getDiscount.length===0 || getDiscountedAmount.length===0)}
      >
        <Text style={styles.btnText}>Save Calculations</Text>
      </TouchableOpacity>
    </View>
    
    </View>
);
}

function HistoryScreen ({navigation, route}){

  var newArray = route.params.newHistory;
  const[getHistory, setHistory] = useState(newArray);
  

  const removeHistoryItem = (itemKey) =>{
    console.log(itemKey);
    setHistory(List =>getHistory.filter(item => item.key != itemKey));
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ paddingLeft: 10 }}>
        <AntDesign
          name="back"
          size={32}
          color="black"
          onPress={() =>
            navigation.navigate('Home', {returnList: setHistory})
          }
        />
      </View>
    ),
    });
  }, [navigation]);

   return(
   <View style={styles.container}> 
    <ScrollView style={styles.ScrollView}>
        {getHistory.map((val) => 
        <View style={styles.scrollViewItem} >
          <Text style={styles.ScrollText} key= {val.key}>Origional Price:{val.data[0]} {"\n"}
                                          Discount %: {val.data[1]} {"\n"}
                                          Discounted Amount: {val.data[2]} {"\n"}
                                          Saving: {val.data[3]} {"\n"} 
          </Text>
          <TouchableOpacity onPress= {() => removeHistoryItem(val.key)}>
            <View  style={styles.crosstextContainer}>
              <Text style={styles.crossText}>X</Text>
            </View>
          </TouchableOpacity>
        </View>
        )}
      </ScrollView>
    </View> 
  );
}

export default function App() {
  const Stack = createStackNavigator();
  return (
     <NavigationContainer>
        <Stack.Navigator initialRouteName={"Home"}>
          <Stack.Screen name="Home" options={{title: 'Discount Calculator'}} component={StartScreen} />
          <Stack.Screen name="History" 
          options={{
            headerTitle: 'History', 
            headerTitleAlign: 'center'
            }} component={HistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C5B7B',
    alignItems: 'center',
    paddingTop: 80,
  //  justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontStyle: "italic",
    color: "#F25278",
    padding: 10,
  },
  InputContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#6C5B7B",
    width: "100%",
    justifyContent: "space-between" ,
    alignItems: "center" 
  },
  inner: {
    padding: 8,
    alignItems: "center",
    width: "100%",
  },
  InputHeading: {
    fontSize: 20,
    color: 'white',
  },
  TextInput: {
    borderColor: "white",
    borderWidth: 2,
    width: "60%",
    borderRadius: 50,
    fontSize: 16,
    padding: 10,
    color: "white"
  },
  btnView: {
    width: "50%",
    paddingTop: 20
  },
  btn: {
    borderRadius: 50,
    padding: 5,
  },
  btnText: {
    fontSize: 18,
    color: "white",
    paddingLeft: 12,
    padding: 5,
    textAlign: "center"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  ScrollView: {
    paddingTop: 20,
    width: "100%"
  },
  scrollViewItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#C06C84",
    alignSelf: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 50
  },
  ScrollText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'white'
  },
  crosstextContainer: {
    backgroundColor: 'white', 
    padding: 5, 
    borderRadius:50,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});
 