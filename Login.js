import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity} from "react-native";


const sendText = async (phoneNumber) => {
  console.log("Phone Number: ", phoneNumber);
  await fetch('https://dev.stedi.me/twofactorlogin/' + phoneNumber, {
    method: 'POST',
    headers:{
      'content-type':'application/text'
    }
  })
}

var email = "error";

const getToken = async ({phoneNumber, oneTimePassword, setUserLoggedIn}) => {
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',  {
    method: 'POST',
    body:JSON.stringify({oneTimePassword, phoneNumber}),
    headers:{
      'content-type':'application/json'
    }
  });

   const responseCode = tokenResponse.status;
   console.log("Response Status Code", responseCode)
   if(responseCode == 200){
    setUserLoggedIn(true);
   }

  const tokenResponseString = await tokenResponse.text();
  console.log(tokenResponseString)
  
  const emailFetch = await fetch('https://dev.stedi.me/validate/' + tokenResponseString);
  
  email = await emailFetch.text();
  console.log(email)
};

function getEmail() {
  return email;
}

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="801-867-5309"
        placeholderTextColor='#D3D3D3'
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
        <Text>Send OTP</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor='#D3D3D3'
        keyboardType="numeric"
        secureTextEntry = {true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn})}}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin:{
    marginTop:100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export {Login, getEmail};