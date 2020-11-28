import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight, ScrollView, Modal, Alert } from 'react-native';

export default function App() {

  const[getAmount, setAmount] = useState("");
  const[getDiscount, setDiscount] = useState("");

  const[getSavedAmount, setSavedAmount] = useState("");
  const[getDiscountedAmount, setDiscountedAmount] = useState("");

  const[getHistory, setHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
    var histArray = getHistory;
    var newArray = [];
    newArray.push(getAmount);
    newArray.push(getDiscount);
    newArray.push(getDiscountedAmount);
    newArray.push(getSavedAmount);
    histArray.push(newArray);
    setHistory(histArray);
  }
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>Calculation History</Text>
          <ScrollView>
                {getHistory.map(
                    (val) => <Text key={Math.random()} style={{color:"#FFFFFF"}}>
                                    Origional Price:{val[0]} {"\n"}
                                    Discount %: {val[1]} {"\n"}
                                    Dscounted Amount: {val[2]} {"\n"}
                                    Saving: {val[3]} {"\n"} 
                              </Text>
                )}
            </ScrollView>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#F25278" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>"DISCOUNT CALCULATOR"</Text>
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
        style={styles.btn}
        onPress={() => calcDiscount()}
        >
          <Text style={styles.btnText}>Calculate Discount</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity
        style={styles.btn}
        onPress={() => histRecord()}
        >
          <Text style={styles.btnText}>Save Calculations</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity
        style={styles.btn}
        onPress={() => {setModalVisible(!modalVisible)}}
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#FFFFFF"
  }
});
