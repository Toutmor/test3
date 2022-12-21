import { Component } from "react";
import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

export default class ItemList extends Component{
    renderColSepa = () => {
		return (
		<View
			style={{
			height: "100%",
			width: 2,
			backgroundColor: "#CED0CE",
			marginRight: "2%"
			}}
		/>
		);
	};
    
	renderSeparator = () => {
		return (
		<View
			style={{
			height: 1,
			width: "100%",
			backgroundColor: "#CED0CE",
			// marginLeft: "9%"
			}}
		/>
		);
	}; 
    render(){
        const {item,index,selectedIndex,addToList,getIndex} = this.props
        return(
            <View>
            <View style={{
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center",  
                alignContent:"center",
                backgroundColor:(item === selectedIndex) ? "#929292":"white"
                }}>
            <TouchableOpacity style={{height:50, width:80,alignContent:"center",justifyContent:"center"}}>
            <Text style={{}}>{item.registered_at}</Text>
            {/* {this.renderColSepa()} */}
            
            </TouchableOpacity>
            {this.renderColSepa()}
            {/* <View style={{height:40, width:30,alignContent:"center",justifyContent:"center"}}> */}
            
            <TouchableOpacity
            style={{height:40, width:50,alignContent:"center",justifyContent:"center"}}
            //contentStyle={{height:40, width:30}}
            // onLongPress={()=>addToList()}
            
            
            onPress={ ()=>getIndex()}
            // delay={10}
            //singleTap { ()=> this.getIndex(this.state.data_item.findIndex(it=>it.time === item.time))}
            //labelStyle={{color:'black'}}
            >
        
            <Text>
            {index}
            </Text>
            
            </TouchableOpacity>
            
            {/* </View> */}
            {this.renderColSepa()}
            <TouchableOpacity style={{height:40, width:40,left:-8,alignItems:"center",alignContent:"center"}}>
                    <Icon
                name={item.icon}
                type={item.type}
                color={item.color}
                size= {30}
                /> 
            </TouchableOpacity>
            {this.renderColSepa()}
            <TouchableOpacity style={{height:50, width:235,}}
            
            >
            <Text style={{}}>{item.item}</Text>
            </TouchableOpacity>
            {this.renderColSepa()}
            <TouchableOpacity style={{height:50, width:190 ,}}>
            <Text >{item.item_sub_category}</Text>
            {/* {this.renderColSepa()} */}
            </TouchableOpacity>
            {this.renderColSepa()}
            <TouchableOpacity style={{height:50, width:100, left:-10,
                backgroundColor:item.iconFcolor, alignContent:"center",justifyContent:"center"}}>
            {/* <Text>{item.item}</Text> */}
            <View style={{flexDirection:"column",}}>
            <Text style={{color:"#fff", alignSelf:"center", }}>{item.item_category.toUpperCase()}</Text>
            </View>
            </TouchableOpacity>
                {this.renderColSepa()} 
               
            </View>
            <View
			style={{
			height: 1,
			width: "100%",
			backgroundColor: "#CED0CE",
			// marginLeft: "9%"
			}}
		/>
            </View>
        )
    }
}