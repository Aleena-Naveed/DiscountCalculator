import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  const[getAmount, setAmount] = useState("");
  const[getDiscount, setDiscount] = useState("");

  const[getSavedAmount, setSavedAmount] = useState("");
  const[getDiscountedAmount, setDiscountedAmount] = useState("");

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

  const history = ()=>{

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>"DISCOUNT CALCULATOR"</Text>
      <View style={styles.InputContainer}>

        <View style={styles.inner}>
          <Text style={styles.InputHeading}>Original Amount</Text>
          <TextInput
            style={styles.TextInput}
            value={getAmount}
            onChangeText={(val) => setAmount((val))}
            placeholder= "Enter Original Amount"
          />
        </View>
        
        <View style={styles.inner}>
          <Text style={styles.InputHeading}>Discount %</Text>
          <TextInput
            style={styles.TextInput}
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
        style={styles.btn}
        onPress={() => calcDiscount()}
        >
          <Text style={styles.btnText}>Calculate Discount</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity
        style={styles.btn}
        onPress={() => history()}
        >
          <Text style={styles.btnText}>View History</Text>
        </TouchableOpacity>
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
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#F25278",
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
    color: "#000000",
  },
  TextInput: {
    borderColor: "#000000",
    borderWidth: 2,
    width: "60%",
    borderRadius: 50,
    fontSize: 16,
    padding: 10,
    color: "#000000"
  },
  btnView: {
    width: "50%",
    paddingTop: 20
  },
  btn: {
    backgroundColor: "#F25278",
    borderRadius: 50,
    padding: 5,
  },
  btnText: {
    fontSize: 18,
    color: "#000000",
    paddingLeft: 12,
    padding: 5,
    textAlign: "center"
  }
});
