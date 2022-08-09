import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '40%',
        textAlign: 'center',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '30%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    rate: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'center',
        paddingRight: 8,
    },
  });


const InvoiceTableRow = ({items}) => {
    console.log(items);
    const rows = items.map( item => 
        <View style={styles.row} key={item.sno.toString()}>
            <Text style={styles.description}>{item.desc}</Text>
            <Text style={styles.qty}>{item.qty}</Text>
            <Text style={styles.rate}>{item.paymentMode}</Text>
            <Text style={styles.amount}>{item.rate}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow