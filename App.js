import DovizKurlari from "./src/components/DovizKurlari";
import DovizHesap from "./src/components/DovizHesap";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from "react";
import KurHesapla from "./src/components/KurHesapla";




 



const Tab = createBottomTabNavigator();




export default () => {

  
  
  return (
    

    
  
  <NavigationContainer>
    <Tab.Navigator 
    
    
     screenOptions={({route})=> ({
      
      tabBarIcon: ({focused,size,colour}) => {
        let iconName;
        if(route.name === 'Döviz'){
          iconName = focused ? 'upcircle' : 'upcircleo';
        }
        else if (route.name === 'Kur-TRY'){
          iconName = focused ?  'upcircle': 'upcircleo';
          
        }
        else if (route.name === 'TRY-Kur'){
          iconName = focused ?  'upcircle': 'upcircleo';
          
        }
       
        
        return <AntDesign name = {iconName} size = {size} colour = {colour}/>;
        
      }
      

      
      
      
    })}>
      <Tab.Screen  name="Döviz" component={DovizKurlari}   />
    
      <Tab.Screen  name="Kur-TRY" component={DovizHesap} />

      <Tab.Screen name = "TRY-Kur"  component={KurHesapla}></Tab.Screen>
    </Tab.Navigator>
  </NavigationContainer>);
};

  
 

