import React, { Component } from 'react'
import {
  View,
  Text,Button, Image, ScrollView, TouchableOpacity,FlatList
} from 'react-native';
import Products from '../data.json';
import Icon from 'react-native-vector-icons/AntDesign';
import SyncStorage from 'sync-storage';
import { useNavigation } from '@react-navigation/native';


class ProductComponent extends Component{
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
      if(this.state.isAdded == true){
        var cart =SyncStorage.get('cartProducts');
        // var newcart =[]
        cart.map((ele)=>{
          if(ele.id == i.id){
            ele=i;
            
            // SyncStorage.set('cartProducts',cart);
          }
        })
        console.log(cart)
        SyncStorage.set('cartProducts',cart);
      }
    }
    
  }

  Decrease(){
    var i=this.state.item;
    if(i.quantity>0){
      i.quantity=i.quantity-1
      this.setState({item:i})
      if(this.state.isAdded == true){
        var cart =SyncStorage.get('cartProducts');
        // var newcart =[]
        cart.map((ele)=>{
          if(ele.id == i.id){
            ele=i;
            
            // SyncStorage.set('cartProducts',cart);
          }
        })
        console.log(cart)
        SyncStorage.set('cartProducts',cart);
      }
    }

  }

  Addcart(){
    var i=this.state.item;
    if(this.state.item.quantity>0){
      i.isAdded=true;
      var cart =SyncStorage.get('cartProducts');
      var newcart = [...cart,i];
      this.setState({item:i});
      SyncStorage.set('cartProducts',newcart);
      console.log(SyncStorage.get('cartProducts'));
    }
  }

render(){
  return(
    <View>
      <TouchableOpacity>
        <View style={{marginLeft:4, marginRight:4}}>
            <View style={{flexDirection:"row",marginTop:10, height:140}}>
              <View style={{flex:1}}>
                <Image style={{width:120, height:120,flex:1}} source={require('../iphone.jpg')}/>
              </View>
              <View style={{flex:2}}>
              <Text style={{fontSize:18}}>{this.state.item.item}, {this.state.item.model}</Text>
              <Text style={{fontSize:15}}>Price : {this.state.item.Price}</Text>
              
              <View style={{ flexDirection: 'row', marginBottom: 5}}>
                    <View style={{flex:1,justifyContent:'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={()=>this.Decrease()}>
                          <Icon name="minuscircleo" size={30} color="#900" />
                      </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent:'center', alignItems: 'center'}}>
                      <Text>{this.state.item.quantity}</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={()=>this.Increase()}>
                        <Icon name="pluscircleo" size={30} color="#900" />
                      </TouchableOpacity>
                    </View>
              </View>
              {(!this.state.item.isAdded) && (<Button

                title="Add to cart"
                onPress={() => this.Addcart()}
                />)}
              
              </View>
            </View>
            
        </View>
      </TouchableOpacity>
    </View>
  )
}

}



class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      productsData:{}
    }
  }

  


  componentDidMount(){
    this.setState({productsData:Products.Products})
    SyncStorage.set('cartProducts',[] )
     this.props.navigation.addListener('focus', () => {
      this.getproducts()
      this.button()
    });
  }

  getproducts(){
    var cart = SyncStorage.get('cartProducts')
    var ProductList = Products.Products
    ProductList.map((i)=>{
      cart_item=cart.filter((item)=>{
       return item.id ==i.id 
      })
      if(cart_item.length>0){
        i.quantity=cart_item[0].quantity
        
      }
    })
    this.setState({productsData:ProductList})
  }

  button(){
    var cart = SyncStorage.get('cartProducts')
    var ProductList = Products.Products
    ProductList.map((i)=>{
      cart_item=cart.filter((item)=>{
        return item.id ==i.id 
       })
       if(cart_item.length==0){
        i.isAdded=false
      }
    })
    this.setState({productsData:ProductList})
  }

  componentWillUnmount() {
    
  }


//   static navigationOptions = {
//     headerRight: () => (
//       <TouchableOpacity onPress={() => this.changeScreen()}>                
//         <Icon
//           name="shoppingcart" 
//           size={30} 
//           color="#900" 
//         />
//       </TouchableOpacity>
//       ),
    
// };

  render(){
  
    console.log(Products.Products)
    return(
      
      <ScrollView>
        <FlatList
                  data={Products.Products}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({ item, index }) =>
                    <ProductComponent product={item}
                      navigation={this.props.navigation}
                    />
                    
                  }
                
                />
                <Button
                  title="Go to cart"
                  onPress={() =>this.props.navigation.navigate('Cart')}
                  />
      </ScrollView>
    )
  }
}

// const styles = StyleSheet.create({
// });

export default Home;
