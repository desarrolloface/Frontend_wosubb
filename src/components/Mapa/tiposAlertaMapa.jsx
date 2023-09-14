import React from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Footprints, LightbulbOff, MoreHorizontal, X  } from 'lucide-react-native';
import { Running } from 'iconoir-react-native';
import { Detective } from 'phosphor-react-native';
import * as Animatable from 'react-native-animatable';

export default function TiposAlertaMapa({setVerTiposAlertas}) {
    return (
        <Modal transparent={true} animationType='fade'>
        <View style={modalContainerStyle.modalContainer}> 
            <TouchableOpacity style={{width:'100%', height:'100%'}} onPress={()=>{setVerTiposAlertas(false)}}></TouchableOpacity> 
            <Animatable.View animation='fadeInUpBig' style={modalContainerStyle.modalStyle}>
                <View style={modalContainerStyle.rows}>
                    <View style={modalContainerStyle.conteinerAlerta}>
                        <View style={modalContainerStyle.redCircle}>
                            <Detective size={25} color='#ffffff'></Detective>
                        </View>
                        <Text >Persona</Text>
                        <Text >Sospechosa</Text>
                    </View>
                    <View style={modalContainerStyle.conteinerAlerta}>
                        <View style={modalContainerStyle.yellowCircle}>
                            <Footprints size={25} color='#ffffff'></Footprints>
                        </View>
                        <Text >Actividad</Text>
                        <Text >Sospechosa</Text>
                    </View>
                    <View style={modalContainerStyle.conteinerAlerta}>
                        <View style={modalContainerStyle.orangeCircle}>
                            <LightbulbOff size={25} color='#ffffff'></LightbulbOff>
                        </View>
                        <Text >Falla de</Text>
                        <Text >Iluminación</Text>
                    </View>
                </View>
                <View style={modalContainerStyle.rows}>
                    <View style={modalContainerStyle.conteinerAlerta}>
                        <View style={modalContainerStyle.greenCircle}>
                            <Running height={30} width={30} color='#ffffff'></Running>
                        </View>
                        <Text >Incidente de</Text>
                        <Text >Robo</Text>
                    </View>

                    <View style={modalContainerStyle.conteinerAlerta}>
                        <View style={modalContainerStyle.PinkCircle}>
                            <Image source={require('../../assets/Vector.png')}></Image>                            
                        </View>
                        <Text >Incidente</Text>
                        <Text >Violencia</Text>
                    </View>

                    <View style={modalContainerStyle.conteinerAlerta}>
                        <View style={modalContainerStyle.blueCircle}>
                            <MoreHorizontal size={25} color='#ffffff'></MoreHorizontal>
                        </View>
                        <Text >Otros</Text>
                    </View>
                </View>

                <View style={modalContainerStyle.boton}>
                    
                        <TouchableOpacity style={modalContainerStyle.xCircle} onPress={()=>{setVerTiposAlertas(false)}}>
                            <X size={25} color='#1c405f'></X>
                        </TouchableOpacity>
                    
                </View>
            </Animatable.View>
        </View>
        </Modal>
    )
}

const modalContainerStyle = StyleSheet.create({
    modalContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(128,138,146, 0.70)'
    },
    modalStyle:{
        width: '100%',
        height: '63%',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: '15%',
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
    redCircle:{
        width: '13%',
        height: '15%',
        padding :'20%',
        marginTop: '10%',
        justifyContent: "center",
        backgroundColor: 'red',
        alignItems: 'center',
        borderRadius: 100,
    },
    yellowCircle:{
        width: '13%',
        height: '15%',
        padding :'20%',
        marginTop: '10%',
        backgroundColor: '#ffc83e',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100
    },
    orangeCircle:{
        width: '13%',
        height: '15%',
        padding :'20%',
        marginTop: '10%',
        backgroundColor: '#ef893c',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 100
    },
    greenCircle:{
        width: '13%',
        height: '15%',
        padding :'20%',
        marginTop: '10%',
        backgroundColor: 'green',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 100
    },
    PinkCircle:{
        width: '13%',
        height: '15%',
        padding :'20%',
        marginTop: '10%',
        backgroundColor: '#ea75ea',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 100
    },
    blueCircle:{
        width: '13%',
        height: '15%',
        padding :'20%',
        marginTop: '10%',
        backgroundColor: '#75b2ea',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 100
    },
    xCircle:{
        width: '13%',
        height: '15%',
        padding :'9%',
        marginHorizontal: '41%',
        backgroundColor: '#e5ecf7',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 100
    },
    rows:{
        width: '95%',
        height: '35%',
        flexDirection: 'row',       
    },
    boton:{
        width: '95%',
        flexDirection: 'row',
        marginTop: '10%',
    },
    conteinerAlerta:{
        width: '33.3%',
        alignItems: 'center'
    }
});
