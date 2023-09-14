import React from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Footprints, LightbulbOff, MoreHorizontal, X  } from 'lucide-react-native';
import { Running } from 'iconoir-react-native';
import { Detective } from 'phosphor-react-native';
import * as Animatable from 'react-native-animatable';

export default function ModalSelectAlerta({setisModalOpen,setTipoAlerta, tipoAlerta}) {
    
    const clickAlerta = (tipo) => {
        //console.log(tipo)
        setTipoAlerta(tipo) 
    }  
    return (
    <>   
        
        <Modal transparent={true} animationType='fade'>
            
        <View style={modalContainerStyle.modalContainer}> 
            <TouchableOpacity style={{width:'100%', height:'100%'}} onPress={()=>{setisModalOpen(!setisModalOpen)}}></TouchableOpacity>
            <Animatable.View animation='fadeInUpBig' style={modalContainerStyle.modalStyle}>
                <View style={modalContainerStyle.rows}>
                    <TouchableOpacity style={[modalContainerStyle.conteinerAlertaR, tipoAlerta === "Persona sospechosa" ? {borderWidth: 2}:(null)]} onPress={()=>{clickAlerta("Persona sospechosa")}}>
                        <View style={modalContainerStyle.redCircle}>
                            <Detective size={25} color='#ffffff'></Detective>
                        </View>
                        <Text style={{paddingTop: '10%'}}>Persona</Text>
                        <Text >Sospechosa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[modalContainerStyle.conteinerAlertaY, tipoAlerta === "Actividad sospechosa" ? {borderWidth: 2}:(null)]} onPress={()=>{clickAlerta("Actividad sospechosa")}}>
                        <View style={modalContainerStyle.yellowCircle}>
                            <Footprints size={25} color='#ffffff'></Footprints>
                        </View>
                        <Text style={{paddingTop: '10%'}}>Actividad</Text>
                        <Text >Sospechosa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[modalContainerStyle.conteinerAlertaO, tipoAlerta === "Falla de iluminacion" ? {borderWidth: 2}:(null)]} onPress={()=>{clickAlerta("Falla de iluminacion")}}>
                        <View style={modalContainerStyle.orangeCircle}>
                            <LightbulbOff size={25} color='#ffffff'></LightbulbOff>
                        </View>
                        <Text style={{paddingTop: '10%'}}>Falla de</Text>
                        <Text >Iluminación</Text>
                    </TouchableOpacity>
                </View>
                <View style={modalContainerStyle.rows}>
                    <TouchableOpacity style={[modalContainerStyle.conteinerAlertaG, tipoAlerta === "Incidente de robo" ? {borderWidth: 2}:(null)]} onPress={()=>{clickAlerta("Incidente de robo")}}>
                        <View style={modalContainerStyle.greenCircle}>
                            <Running height={30} width={30} color='#ffffff'></Running>
                        </View>
                        <Text style={{paddingTop: '10%'}}>Incidente de</Text>
                        <Text >Robo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[modalContainerStyle.conteinerAlertaP, tipoAlerta === "Incidente de violencia" ? {borderWidth: 2}:(null)]} onPress={()=>{clickAlerta("Incidente de violencia")}}>
                        <View style={modalContainerStyle.PinkCircle}>
                        <Image source={require('../../assets/Vector.png')}></Image>
                        </View>
                        <Text style={{paddingTop: '10%'}}>Incidente</Text>
                        <Text >Violencia</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[modalContainerStyle.conteinerAlertaA, tipoAlerta === "Otros" ? {borderWidth: 2}:(null)]} onPress={()=>{clickAlerta("Otros")}}>
                        <View style={modalContainerStyle.blueCircle}>
                            <MoreHorizontal size={25} color='#ffffff'></MoreHorizontal>
                        </View>
                        <Text style={{paddingTop: '10%'}}>Otros</Text>
                    </TouchableOpacity>
                </View>

                <View style={modalContainerStyle.rows}>

                        <TouchableOpacity style={modalContainerStyle.button} onPress={()=>{setisModalOpen(!setisModalOpen)}}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Seleccionar</Text>
                        </TouchableOpacity>
                        
                    
                </View>
            </Animatable.View>
        </View>
        </Modal>
    </>
    )
}

const modalContainerStyle = StyleSheet.create({
    modalContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(128,138,146, 0.70)'
    },
    modalStyle:{
        //margin: 20,
        width: '100%',
        height: '60%',
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
        //marginHorizontal: '40%',
        marginTop: '17%',
        justifyContent: "center",
        backgroundColor: 'red',
        alignItems: 'center',
        borderRadius: 100,
    },
    yellowCircle:{
        width: '13%',
        height: '15%',
        padding :'20%',
        marginTop: '17%',
        backgroundColor: '#ffc83e',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100
    },
    orangeCircle:{
        width: '13%',
        height: '15%',
        padding :'20%',
        marginTop: '17%',
        backgroundColor: '#ef893c',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 100
    },
    greenCircle:{
        width: '13%',
        height: '15%',
        padding :'20%',
        marginTop: '17%',
        backgroundColor: 'green',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 100
    },
    PinkCircle:{
        width: '13%',
        height: '15%',
        padding :'20%',
        marginTop: '17%',
        backgroundColor: '#ea75ea',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 100
    },
    blueCircle:{
        width: '13%',
        height: '15%',
        padding :'20%',
        marginTop: '17%',
        backgroundColor: '#75b2ea',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 100
    },
    xCircle:{
        width: '13%',
        height: '15%',
        padding :'9%',
        //marginTop: '10%',
        marginHorizontal: '40%',
        backgroundColor: '#e5ecf7',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 100
    },
    rows:{
        //flex:1,
        width: '95%',
        height: '35%',
        flexDirection: 'row',
        //paddingVertical: '20%',
        //marginHorizontal: '10%',
        //alignItems: 'center',
        
    },
    conteinerAlertaR:{
        width: '31%',
        backgroundColor: '#F9434333',
        paddingLeft: '3%',
        //alignItems: 'center',
        margin: '1%',
        borderRadius: 20
    },
    conteinerAlertaY:{
        width: '31%',
        backgroundColor: '#FFC83E33',
        paddingLeft: '3%',
        //alignItems: 'center',
        margin: '1%',
        borderRadius: 20
    },
    conteinerAlertaO:{
        width: '31%',
        backgroundColor: '#EF893C33',
        paddingLeft: '3%',
        //alignItems: 'center',
        margin: '1%',
        borderRadius: 20
    },
    conteinerAlertaG:{
        width: '31%',
        backgroundColor: '#5FC14D33',
        paddingLeft: '3%',
        //alignItems: 'center',
        margin: '1%',
        borderRadius: 20
    },
    conteinerAlertaP:{
        width: '31%',
        backgroundColor: '#EA75EA33',
        paddingLeft: '3%',
        //alignItems: 'center',
        margin: '1%',
        borderRadius: 20
    },
    conteinerAlertaA:{
        width: '31%',
        backgroundColor: '#75B2EA33',
        paddingLeft: '3%',
        //alignItems: 'center',
        margin: '1%',
        borderRadius: 20
    },
    button:{
        width: "55%",
        height: "28%",
        backgroundColor: '#0140b1',
        marginHorizontal: '23%',
        alignSelf: "center",
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        bottom: '5%'
        //margin:'7%'
      },
});