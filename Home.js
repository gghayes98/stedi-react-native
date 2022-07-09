import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icons from './Icons.js';
import Bar  from './Bar.js';

function createuser(){
  $.ajax({
      type: 'POST',
      url: '/user',
      data: JSON.stringify({'email': userName}),
      success: function(data) { alert(data);
      window.location.href = "/index.html"},
      contentType: "application/text",
      dataType: 'text'
  });
}

const Home = (props) => {
  return (
    <View>
      <Bar loggedInUser = {props.loggedInUser} />
      <Icons />
    </View>
  );
};

export default Home;
