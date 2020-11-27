import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {

  const[getAmount, setAmount] = useState("");
  const[getDiscount, setDiscount] = useState("");

  const Disc = (val)=>{
    if(Number(val)<0 || Number(val)>100){
      alert("Invalid Discount %")
      setDiscount("");
    }
    else{
      setDiscount(Number(val));
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>"DISCOUNT CALCULATOR"</Text>
      <View style={styles.InputContainer}>
        <Text style={styles.InputHeading}>Original Amount</Text>
        <TextInput
          style={styles.TextInput}
          value={getAmount}
          onChangeText={(val) => setAmount(Number(val))}
          placeholder= "Enter Original Amount"
        />
        <Text style={styles.InputHeading}>Discount %</Text>
        <TextInput
          style={styles.TextInput}
          value={getDiscount}
          onChangeText={(val) => Disc(val)}
          placeholder= "Enter Discount %"
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: "#F25278",
    width: "100%",
    justifyContent: "space-between" ,
    alignItems: "center" 
  },
  InputHeading: {
    fontSize: 20,
    color: "#000000",
  },
  TextInput: {
    borderColor: "#000000",
    borderWidth: 2,
    width: "60%",
    borderRadius: 50,
    fontSize: 16,
    padding: 10
  },
});
