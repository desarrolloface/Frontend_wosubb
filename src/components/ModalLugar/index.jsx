import React,{useEffect, useState, useRef} from 'react'
import { View, Modal, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import departamentos from "../../json/depatamentosUbb.json";
import {Toilet} from 'phosphor-react-native'
import {VenetianMask, Warehouse, Pencil, HardHat, Shapes, Presentation, Utensils, Frame, BookMarked, FlaskConical, DoorOpen, LayoutGrid, Hammer, BookCopy, Recycle, Building , Dumbbell, Users2, Lightbulb, GraduationCap, MapPin, Search} from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';

export default function ModalLugar({setisModalOpen,setisMapaOpen, setUbicacion, coordenadasAlerta, setCoordenadasAlerta }) {
    
    let cord = {
        latitude: -36.82292251647777,
        longitude: -73.01327741968053,
        latitudeDelta: 0.001,     
        longitudeDelta: 0.002,  
    } 
    const [inputBuscar, setInputBuscar] = useState("");

    const handleOpen = () => {
        
        setisModalOpen(false) 
        setisMapaOpen(true)
    };
    
    useEffect(() => {
        setCoordenadasAlerta(cord) 
        /* console.log('coordenadasAlerta:')
        console.log(coordenadasAlerta) */
    },[]);  

/*     useEffect(() => {
        console.log('coordenadasAlerta:')
        console.log(coordenadasAlerta);
      }, [coordenadasAlerta]); */

    const lugarcoor = (la, lo, nombre) => {
        cord={
            latitude: la,
            longitude: lo,
            latitudeDelta: 0.001,     
            longitudeDelta: 0.002,
        } 
        setUbicacion(nombre)
        setCoordenadasAlerta(cord);
        setisModalOpen(!setisModalOpen)
        /* console.log('coordenadasAlerta:')
        console.log(coordenadasAlerta) */
    }

    const pinLugar = (lugar) => {
        if(lugar === "LayoutGrid"){
            return <LayoutGrid size={28} color='#1C405F'></LayoutGrid>
        }
        if(lugar === "Hammer"){
            return <Hammer size={28} color='#1C405F'></Hammer>
        }
        if(lugar === "BookCopy"){
            return <BookCopy size={28} color='#1C405F'></BookCopy>
        }
        if(lugar === "Recycle"){
            return <Recycle size={28} color='#1C405F'></Recycle>
        }
        if(lugar === "Entypo"){
            return <FlaskConical size={28} color='#1C405F'></FlaskConical>
        }
        if(lugar === "MaterialCommunityIcons"){
            return <Building size={28} color='#1C405F'></Building>
        }
        if(lugar === "GraduationCap"){
            return <GraduationCap size={28} color='#1C405F'></GraduationCap>
        }
        if(lugar === "Pencil"){
            return <Pencil size={28} color='#1C405F'></Pencil>
        }
        if(lugar === "Shapes"){
            return <Shapes size={28} color='#1C405F'></Shapes>
        }
        if(lugar === "Presentation"){
            return <Presentation size={28} color='#1C405F'></Presentation>
        }
        if(lugar === "Utensils"){
            return <Utensils size={28} color='#1C405F'></Utensils>
        }
        if(lugar === "Frame"){
            return <Frame size={28} color='#1C405F'></Frame>
        }
        if(lugar === "Lightbulb"){
            return <Lightbulb size={28} color='#1C405F'></Lightbulb>
        }
        if(lugar === "BookMarked"){
            return <BookMarked size={28} color='#1C405F'></BookMarked>
        }
        if(lugar === "Users2"){
            return <Users2 size={28} color='#1C405F'></Users2>
        }
        if(lugar === "DoorOpen"){
            return <DoorOpen size={28} color='#1C405F'></DoorOpen>
        }
        if(lugar === "Dumbbell"){
            return <Dumbbell size={28} color='#1C405F'></Dumbbell>
        }
        if(lugar === "Toilet"){
            return <Toilet size={28} color='#1C405F'></Toilet>
        }
        if(lugar === "HardHat"){
            return <HardHat size={28} color='#1C405F'></HardHat>
        }
        if(lugar === "VenetianMask"){
            return <VenetianMask size={28} color='#1C405F'></VenetianMask>
        }
        if(lugar === "Warehouse"){
            return <Warehouse size={28} color='#1C405F'></Warehouse>
        }
    }

    
    return (
    <>   
        <Modal transparent={true} animationType='fade'>
        <View style={modalContainerStyle.modalContainer}> 
            <TouchableOpacity style={{width:'100%', height:'100%'}} onPress={()=>{setisModalOpen(!setisModalOpen)}}></TouchableOpacity>
            <Animatable.View animation='fadeInUpBig' style={modalContainerStyle.modalStyle}>
                <View style={modalContainerStyle.textInput}>
                    <TextInput 
                        style={{flex: 3.5, color:'black'}}
                        placeholder="Buscar"
                        value={inputBuscar}
                        onChangeText={(text)=> setInputBuscar(text)}      
                    >
                    </TextInput>
                    <TouchableOpacity style={{flex: 0.5, justifyContent: 'center'}}>
                        <Search size={35} color='#1C405F'></Search>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{width: '100%'}}>
                    <View style={{width: '100%', alignItems:'center'}}>
                    {
                    departamentos.map((lugar,i) =>(
                        inputBuscar === "" ? (
                        <TouchableOpacity style={modalContainerStyle.conteinerLugar} key={i}  onPress={()=>{
                            lugarcoor(lugar.latitud, lugar.longitud, lugar.nombre)      
                        }}>
                            <View style={modalContainerStyle.Circle}> 
                                {pinLugar(lugar.tipoIcon)}
                            </View>
                            <View style={{width: '70%',marginLeft: '3%', justifyContent:'center'}}>
                                <Text style={{color:'#1C405F', }}>{lugar.nombre}</Text>
                            </View>
                        </TouchableOpacity>
                        ):(
                            lugar.nombre.toLocaleLowerCase().includes(inputBuscar.toLocaleLowerCase()) ? (
                            <TouchableOpacity style={modalContainerStyle.conteinerLugar} key={i} onPress={()=>{lugarcoor(lugar.latitud, lugar.longitud, lugar.nombre)}}>
                                <View style={modalContainerStyle.Circle}> 
                                    {pinLugar(lugar.tipoIcon)}
                                </View>
                                <View style={{width: '70%',marginLeft: '3%', justifyContent:'center'}}>
                                    <Text style={{color:'#1C405F', }}>{lugar.nombre}</Text>
                                </View>
                            </TouchableOpacity>
                            ):(null)
                        )
                    ))
                    }
                    </View>
                </ScrollView>
                <View style={modalContainerStyle.rows}>

                        <TouchableOpacity style={modalContainerStyle.button} onPress={handleOpen}>
                            <View style={modalContainerStyle.mapCircle}> 
                                <MapPin size={28} color='#1C405F'></MapPin>
                            </View>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Fijar la ubicación en el mapa</Text>
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
        height: '80%',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: '8%',
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
    textInput:{
        height: 55,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#1c405f',
        marginHorizontal: '5%',
        marginVertical: '4%',
        borderRadius: 13,
        paddingLeft: "5%",
        color: 'black',  
      },
    Circle:{
        padding :'3%',
        margin: '2%',
        justifyContent: "center",
        backgroundColor: '#BFCEE6',
        alignItems: 'center',
        borderRadius: 100,
    },
    mapCircle:{
        padding :'3%',
        margin: '2%',
        marginHorizontal: '5%',
        justifyContent: "center",
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 100,
    },
    
    rows:{
        width: '95%',
        height: '25%',
        flexDirection: 'row',
    },
    conteinerLugar:{
        flex:0.1,
        width: '90%',
        flexDirection:'row',
        backgroundColor: '#F2F5FB',
        paddingLeft: '3%',
        margin: '1%',
        borderRadius: 20
    },
    button:{
        width: "95%",
        height: "50%",
        flexDirection: 'row',
        backgroundColor: '#0140b1',
        marginHorizontal: '3%',
        alignSelf: "center",
        borderRadius: 20,
        alignItems: "center",
        bottom: '5%'
      },
});