import React, { Component } from 'react'
import {
  View,
  Text,Button,ScrollView,FlatList,TouchableOpacity,Image
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class Headerscreen extends Component{
  render(){
    return(
      <View>
          <TouchableOpacity >
            <Icon name="shoppingcart" size={30} color="#900" />
          </TouchableOpacity>
      </View>
    )
  }
}

export default Headerscreen;
