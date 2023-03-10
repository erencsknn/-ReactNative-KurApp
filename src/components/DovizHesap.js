import React, { useEffect } from 'react'
import { Text, View, StyleSheet,Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'




const DovizHesap = ({ }) => {
    
    const [cikti, setcikti] = useState()
    const [er, seter] = useState();
    const [state, setState] = useState({
        Kur: null,
    });
   
    useEffect(async () => {

        try {


            const parseString = await require('react-native-xml2js').parseString;
            const response = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml');
            let responseXml = await response.text();
            await parseString(responseXml, function (err, result) {
                result.Tarih_Date.Currency.pop();
                setState({ Kur: result });
                seter(result.Tarih_Date.Currency[0].ForexBuying);
            });

        } catch (error) {
            console.log('fetch', err)
        }


    }, []);


    
    



  
    return state.Kur===null? (
        <Text>yükleniyor....</Text>
       
    ):
    (
        <View style = {{ alignItems:'center', backgroundColor: '#000000', height : 600, width : 400}}>
             
            <View style ={{marginTop : 90}}>
            
            <Text style ={{fontSize : 20, color : '#cae1ff',marginLeft: 55,marginBottom:60,fontStyle:'italic'}} >KUR-TRY Dönüştürücü </Text>
            <Text style ={{fontSize : 20, color : '#cae1ff',marginLeft: 100,marginBottom:40, fontStyle : 'italic'}}>Kur Seçiniz</Text>
            <Dropdown style={{backgroundColor: '#cae1ff',height:50, width: 300,borderWidth: 5,borderColor:'#cae1ff',borderRadius:9, marginLeft: 6}} data={state.Kur.Tarih_Date.Currency} labelField = 'Isim' valueField='' onChange={(value)=>seter(value.ForexBuying)} ></Dropdown>
            <TextInput style = {styles.input} placeholder ='ÇEVİRİLECEK KUR TUTARI YAZINIZ.' onChangeText={(newValue) => { setcikti((newValue *er).toFixed(2))}}></TextInput>
            
            <Text style = {styles.input} > TRY {cikti} </Text>
            

            </View>

          
            
            
            

        </View>

    )


}
const styles = StyleSheet.create({
    container: {

        flex: 1
    },
    input: {
        marginTop:10,
        margin: 5,
        paddingVertical: 8,
        borderRadius:9,
        borderWidth: 5,
        borderColor: '#cae1ff',
        borderRadius: 6,
        backgroundColor: '#cae1ff',
        color: '#808080',
        textAlign: 'center',
        width: 300,
        fontSize: 15,
        fontWeight: 'bold',
        height: 50,
        




    },
    textstyle : {
        marginTop: 50,
        margin: 5,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#eeeee0',
        color: '#808080',
        textAlign: 'center',
        width: 300,
        fontSize: 30,
        fontWeight: 'bold',
        height: 50
     
        

    },
  
    
        

    }


)







export default DovizHesap;

