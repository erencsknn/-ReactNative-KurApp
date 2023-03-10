import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList,Image } from 'react-native'









const DovizKurlari = () => {
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
            });

        } catch (error) {
            console.log('fetch', err)
        }


    }, []);


    console.log(state);
    return (

        <View style={{ height: 700, width: 700 }}>

            <View style={styles.container} >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.DovizBaslik}>Döviz</Text>
                    <Text style={styles.Baslik}>Alış Fiyatı</Text>
                    <Text style={styles.SatisBaslik}>Satış Fiyatı</Text>
                </View>
                <FlatList showsHorizontalScrollIndicator={false} style={{ flexDirection: "column" }} data={state.Kur != null ? state.Kur.Tarih_Date.Currency : []} renderItem={({ item, index }) => {
                    return (<View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>

                            <View style={{ flexDirection: 'row' }}>
                            
                                <Text style={styles.DovizIsim}>{item.Isim}</Text>
                                <Text style={styles.DovizIsim}> {item.$.Kod}/TRY </Text>
                            </View>
                        </View>
                        <View>

                            <Text style={styles.title}>{item.ForexBuying}</Text>
                        </View>
                        <View>

                            <Text style={styles.SatisFiyat}>{item.ForexSelling}</Text>
                        </View>
                    </View>

                    );

                }} />












            </View>

        </View>




    )

}
const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        flex: 1,
        padding: 24,
        backgroundColor: '#000000',
    },
    title: {

        margin: 5,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#000000',
        color: '#808080',
        textAlign: 'center',
        width: 70,
        fontSize: 15,
        fontWeight: 'bold',
        height: 50

    },
    DovizIsim: {
        margin: 5,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#000000',
        color: '#ffc000',
        textAlign: 'center',
        width: 70,
        fontSize: 7,
        fontWeight: 'bold',
        height: 50,
        alignSelf: 'flex-end',
        fontStyle : 'italic'


    },
    DovizBaslik: {
        margin: 5,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#000000',
        color: '#cae1ff',
        textAlign: 'center',
        width: 150,
        fontSize: 20,
        fontWeight: 'bold',
        height: 50,
        fontStyle : 'italic'

    },
    SatisBaslik: {
        margin: 5,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#000000',
        color: '#cae1ff',
        textAlign: 'center',
        width: 80,
        fontSize: 13,
        fontWeight: 'bold',
        height: 50,
        fontStyle : 'italic'

    },
    Baslik: {
        margin: 5,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#000000',
        color: '#cae1ff',
        textAlign: 'center',
        width: 70,
        fontSize: 13,
        fontWeight: 'bold',
        height: 50,
        fontStyle : 'italic'

    },
    SatisFiyat: {
        margin: 5,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#000000',
        color: '#cae1ff',
        textAlign: 'center',
        width: 80,
        fontSize: 15,
        fontWeight: 'bold',
        height: 50,
        alignSelf: 'flex-start'
    }
})


export default DovizKurlari;