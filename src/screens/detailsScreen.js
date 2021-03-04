import React, { Component } from 'react'
import {
  View,
  Text,Button,ScrollView,FlatList,TouchableOpacity,Image
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import SyncStorage from 'sync-storage';
// import { withNavigation, NavigationEvents } from 'react-navigation'

class CartComponent extends Component{
  constructor(props){
    super(props);
    this.state={
      item:{},
      addedProducts:[],
      isAdded:false,
    }
  }

  componentDidMount(){
    this.setState({item:this.props.product})
  }

  Increase(){
    var i=this.state.item;
    if(i.quantity<10){
      i.quantity=i.quantity+1
      this.setState({item:i})
    }
    
  }

  Decrease(){
    var i=this.state.item;
    if(i.quantity>0){
      i.quantity=i.quantity-1
      this.setState({item:i})
    }

  }




render(){
  // console.log(this.state.productsData)
  return(
    <View>
        <View style={{marginLeft:4, marginRight:4}}>
            <View style={{flexDirection:"row",marginTop:10, height:140}}>
              <View style={{flex:1}}>
                <Image style={{width:120, height:120,flex:1}} source={require('../iphone.jpg')}/>
              </View>
              <View style={{flex:2}}>
              <Text style={{fontSize:18}}>{this.props.product.item}-{this.props.product.model}</Text>
              <Text style={{fontSize:15}}>Price : {this.props.product.Price}</Text>
              <View style={{ flexDirection: 'row', marginBottom: 5}}>
                    <View style={{flex:1,justifyContent:'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={()=>this.Decrease()}>
                          <Icon name="minuscircleo" size={30} color="#900" />
                      </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent:'center', alignItems: 'center'}}>
                      <Text>{this.props.product.quantity}</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={()=>this.Increase()}>
                        <Icon name="pluscircleo" size={30} color="#900" />
                      </TouchableOpacity>
                    </View>
              </View>
              <Button

                  title="Remove from cart"
                  onPress={() => this.props.delete(this.props.product)}
                />
              </View>
           </View>
        </View>
    </View>
  )
}

}

class Details extends Component{
  constructor(props){
    super(props);
    this.state={
      cartItems:[]
    }
  }

  componentDidMount(){
    this.setState({cartItems:SyncStorage.get('cartProducts')})
    // this.props.navigation.addListener('focus', () => {
    // });
    // alert("hello")
    // console.log(SyncStorage.get('cartProducts'))
  }

  removeFromCart(item){
        var cart=SyncStorage.get('cartProducts')
        var newCart = cart.filter((it)=> it.id != item.id)
        SyncStorage.set('cartProducts',newCart);
        console.log("hello")
        console.log(SyncStorage.get('cartProducts'))
        this.setState({cartItems:newCart})
        // this.setState({cartItems: newcart })
        // this.setcart
       
  }

  // setcart(){
  //   alert("hello")
  //   this.setState({cartItems:SyncStorage.get('cartProducts')})
  //   console.log(this.state.cartItems)
  // }



  render(){
    console.log(this.state.cartItems)
    return(
      <ScrollView>
        <FlatList
                  data={this.state.cartItems}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({ item, index }) =>
                    <CartComponent product={item}
                      navigation={this.props.navigation}
                      delete={this.removeFromCart.bind(this)}
                    />
                    
                  }
                
                />
                 {/* <NavigationEvents
            onDidFocus={() => {
              this.componentDidMount()
            }}/> */}
      </ScrollView>
    )
  }
}

// const styles = StyleSheet.create({
// });

export default Details;
