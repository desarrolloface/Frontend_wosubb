
import React, {useState} from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Calendar} from "react-native-calendars";
import {LocaleConfig} from 'react-native-calendars';

export default function ModalSelectAlerta({setisModalOpen,tiempo, guardarDatos}) {
    
    const [selected, setSelected] = useState('');
    return (
    <>   
        
        <Modal transparent={true} animationType='fade'>
        <View style={modalContainerStyle.modalContainer}> 
            <TouchableOpacity style={{width:'100%', height:'100%'}} onPress={()=>{setisModalOpen(!setisModalOpen)}}></TouchableOpacity>
            <Animatable.View animation='fadeInUpBig' style={modalContainerStyle.modalStyle}>
                
                <View style={modalContainerStyle.rows}>
                       <Calendar
                        onDayPress={day => {
                            setSelected(day);   
                        }}
                        markedDates={{
                            [selected.dateString]: {selected: true, selectedColor: '#0140b1'}
                        }}
                        theme={{
                            monthTextColor: '#0140b1',
                            todayTextColor: '#0140b1',
                            textMonthFontWeight: 'bold', 
                        }}
                       ></Calendar>   
                </View>

                <View style={modalContainerStyle.contBotn}>

                        <TouchableOpacity style={modalContainerStyle.button} onPress={()=>{
                            selected !== '' ? (guardarDatos(selected,tiempo))
                            :(setisModalOpen(false))
                            }}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={modalContainerStyle.buttonC} onPress={()=>{setisModalOpen(!setisModalOpen)}}
                        >
                            <Text style={{color: '#1C405F', fontWeight: 'bold'}}>Cancelar</Text>
                        </TouchableOpacity> 
                    
                </View>
            </Animatable.View>
        </View>
        </Modal>
    </>
    )
}

LocaleConfig.locales['es'] = {
    monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ],
    monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ago.','Sep.','Oct.','Nov.','Dic.'],
    dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
    dayNamesShort: ['Dom.','Lun.','Mar.','Mié.','Jue.','Vie.','Sáb.'],
    today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

const modalContainerStyle = StyleSheet.create({
    modalContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(128,138,146, 0.70)'
    },
    modalStyle:{
        //margin: 20,
        width: '100%',
        height: '70%',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: '10%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }, 
    rows:{
        flex:1,
        width: '88%',
    },
    contBotn:{
        flex:0.3,
        width: '88%',
        flexDirection: 'row', 
    },
    button:{
        width: '40%',
        height: 50,
        backgroundColor: '#0140b1',
        marginHorizontal: '5%',
        alignSelf: "center",
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        bottom: '5%'
      },
    buttonC:{
        width: '40%',
        height: 50,
        backgroundColor: '#BFCEE6',
        marginHorizontal: '5%',
        alignSelf: "center",
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        bottom: '5%'
    },
});