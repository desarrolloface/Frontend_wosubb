import React,{useState} from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "./styles"
import MapView,{Marker, PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import IconFA5 from 'react-native-vector-icons/FontAwesome';
import departamentos from "../../json/depatamentosUbb.json";
import departamentoSiluetas from "../../json/departamentosSiluetas.json";
import DetallesAlerta from "../DetallesAlerta"
import mapStyle from "../../json/map_sim.json";
import Icons from '@expo/vector-icons/FontAwesome5';
import {Toilet} from 'phosphor-react-native'
import {  VenetianMask, Warehouse, GraduationCap, Pencil, Shapes, HardHat, Presentation, Utensils, Frame, Lightbulb, BookMarked, FlaskConical, Users2, DoorOpen, Dumbbell, LayoutGrid, Hammer, BookCopy, Recycle, Building } from 'lucide-react-native';

export default function MapaProblematico({setMostrarMapa, alertas, navigation}) {
    const [coordenadasAlerta, setCoordenadasAlerta] = useState(null);
    const [alertaSeleccionada, setAlertaSeleccionada] = useState(null);
    const [verDetallesAlerta, setVerDetallesAlerta] = useState(false);
    
    const [initialRegion, setInitialRegion] = useState({
        latitude: -36.82292251647777,  
        longitude: -73.01327741968053,    
        latitudeDelta: 0.001,      
        longitudeDelta: 0.002,  

    })
    let map = false

    const pinTipoAlerta = (tipo) => {
        if(tipo === "Persona sospechosa"){
            return <IconFA5 name="circle" size={15} color="red" 
            style={{borderRadius: 100,  borderColor: "red",
            shadowColor: "red",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 10,
            shadowRadius: 3.84,
            elevation: 8,
            //borderWidth: 1,
            padding: 4,}}/>
        }
        if(tipo === "Actividad sospechosa"){
            return <IconFA5 name="circle" size={15} color="#ffc83e" 
            style={{borderRadius: 100,  borderColor: "#ffc83e",
            shadowColor: "#ffc83e",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 10,
            shadowRadius: 3.84,
            elevation: 5,
            //borderWidth: 1,
            padding: 4,}}/>
        }
        if(tipo === "Falla de iluminacion"){
            return <IconFA5 name="circle" size={15} color="#EF893CCC" 
            style={{borderRadius: 100,  borderColor: "#EF893CCC",
            shadowColor: "#EF893CCC",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 10,
            shadowRadius: 3.84,
            elevation: 5,
            //borderWidth: 1,
            padding: 4,}}/>
        }
        if(tipo === "Incidente de robo"){
            return <IconFA5 name="circle" size={15} color="green" 
            style={{borderRadius: 100,  borderColor: "green",
            shadowColor: "green",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 10,
            shadowRadius: 3.84,
            elevation: 5,
            //borderWidth: 1,
            padding: 4,}}/>
        }
        if(tipo === "Incidente de violencia"){
            return <IconFA5 name="circle" size={15} color="#ea75ea" 
            style={{borderRadius: 100,  borderColor: "#ea75ea",
            shadowColor: "#ea75ea",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 10,
            shadowRadius: 3.84,
            elevation: 5,
            //borderWidth: 1,
            padding: 4,}}/>
        }
        if(tipo === "Otros"){
            return <IconFA5 name="circle" size={15} color="#75b2ea" 
            style={{borderRadius: 100,  borderColor: "#75b2ea",
            shadowColor: "#75b2ea",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 10,
            shadowRadius: 3.84,
            elevation: 5,
            //borderWidth: 1,
            padding: 4,}}/>
        }
        if(tipo === "Lugar con escasa iluminacion"){
            return <IconFA5 name="circle" size={15} color="#75b2ea" 
            style={{borderRadius: 100,  borderColor: "#75b2ea",
            shadowColor: "#75b2ea",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 10,
            shadowRadius: 3.84,
            elevation: 5,
            //borderWidth: 1,
            padding: 4,}}/>
        }
    }

    const mostrarAlerta = (alerta) => {
        setAlertaSeleccionada(alerta)
        setVerDetallesAlerta(true)
    }

    return (
        <>
        {verDetallesAlerta ? <DetallesAlerta map={map} setIsVisibleAlerta={setVerDetallesAlerta} verAlerta={alertaSeleccionada} permisos={false} notlike={map}/> : (null) }   

         <View style={styles.containerMapa}>
             <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}  
                style={styles.mapa}
                //onRegionChangeComplete={(e)=> {setCoordenadasAlerta(e)}}
                moveOnMarkerPress={false}
                rotateEnabled={false}
                customMapStyle={mapStyle}
                zoomTapEnabled={false}
                showsBuildings={false}
                showsScale={true}
            >
               { alertas.map((alerta,i) => (
                    <Marker
                        key={'alerta'+i}
                        tracksViewChanges={false}
                        coordinate={{
                            latitude: alerta.latitude,
                            longitude: alerta.longitude
                        }}
                        onPress={()=>{mostrarAlerta(alerta)}}
                    > 
                        {pinTipoAlerta(alerta.tipo)}
                    </Marker>
                ))
                }

             {
                departamentos.map((depa, i) => (
                    <Marker
                        key={i}
                        tracksViewChanges={false}
                        title={depa.nombre}
                        coordinate={{
                            latitude: depa.latitud ,
                            longitude: depa.longitud
                        }}
                        opacity={0.5}
                    >
                        <Text style={{position: "absolute"}}> </Text>
                        {
                                    depa.tipoIcon === "LayoutGrid" ? (
                                        
                                        <LayoutGrid size={25} color="#1C405F"/>
                                    ):(
                                        depa.tipoIcon === "Hammer" ? (
                                            
                                            <Hammer size={25} color="#1C405F"/>
                                        ):(
                                            depa.tipoIcon === "BookCopy" ? (
                                                <BookCopy size={25} color="#1C405F"/>
                                            ):(
                                                depa.tipoIcon === "Recycle" ? (
                                                    <Recycle size={25} color="#1C405F"/>
                                                ):(
                                                    depa.tipoIcon === "Entypo" ? (
                                                        <FlaskConical size={25} color="#1C405F"/>
                                                    ):(
                                                        depa.tipoIcon === "MaterialCommunityIcons" ? (
                                                            <Building size={25} color="#1C405F"/>
                                                        ):(
                                                            depa.tipoIcon === "GraduationCap" ? (
                                                                <GraduationCap size={25} color="#1C405F"/>
                                                            ):(
                                                                depa.tipoIcon === "Pencil" ? (
                                                                    <Pencil size={25} color="#1C405F"/>
                                                                ):(
                                                                    depa.tipoIcon === "Shapes" ? (
                                                                        <Shapes size={25} color="#1C405F"/>
                                                                    ):(
                                                                        depa.tipoIcon === "HardHat" ? (
                                                                            <HardHat size={25} color="#1C405F"/>
                                                                        ):(
                                                                            depa.tipoIcon === "Presentation" ? (
                                                                                <Presentation size={25} color="#1C405F"/>
                                                                            ):(
                                                                                depa.tipoIcon === "Utensils" ? (
                                                                                    <Utensils size={25} color="#1C405F"/>
                                                                                ):(
                                                                                    depa.tipoIcon === "Frame" ? (
                                                                                        <Frame size={25} color="#1C405F"/>
                                                                                    ):(
                                                                                        depa.tipoIcon === "Lightbulb" ? (
                                                                                            <Lightbulb size={25} color="#1C405F"/>
                                                                                        ):(
                                                                                            depa.tipoIcon === "BookMarked" ? (
                                                                                                <BookMarked size={25} color="#1C405F"/>
                                                                                            ):(
                                                                                                depa.tipoIcon === "Users2" ? (
                                                                                                    <Users2 size={25} color="#1C405F"/>
                                                                                                ):(
                                                                                                    depa.tipoIcon === "DoorOpen" ? (
                                                                                                        <DoorOpen size={25} color="#1C405F"/>
                                                                                                    ):(
                                                                                                        depa.tipoIcon === "Dumbbell" ? (
                                                                                                            <Dumbbell size={25} color="#1C405F"/>
                                                                                                        ):(
                                                                                                            depa.tipoIcon === 'Toilet' ? (
                                                                                                                <Toilet size={25} color="#1C405F"/>
                                                                                                            ):(
                                                                                                                depa.tipoIcon === 'Warehouse' ? (
                                                                                                                    <Warehouse size={25} color="#1C405F"/>
                                                                                                                ):(
                                                                                                                    depa.tipoIcon === 'VenetianMask' ? (
                                                                                                                        <VenetianMask size={25} color="#1C405F"/>
                                                                                                                    ):(null)
                                                                                                                )
                                                                                                            )
                                                                                                        )
                                                                                                    )
                                                                                                )
                                                                                            )
                                                                                        )
                                                                                    )
                                                                                )
                                                                            )
                                                                        )
                                                                    )
                                                                    
                                                                )
                                                                
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        )
                                    ) 
                                
                                 
                        }
                    </Marker>
                ))
              } 

                {departamentoSiluetas.map((departamento, i) => (
                    <Polygon 
                        key={'departamento'+i}
                        coordinates={departamento.coordenadas}
                        fillColor="rgba(0,0,0,0.1)"
                        strokeColor="rgba(0,0,0,0.1)"
                    />
                ))}   

            </MapView>
            <TouchableOpacity style={styles.botonMenu} onPress={()=>setMostrarMapa(false)}>
                <Icons name="chevron-left" size={20} color='black'></Icons>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.botonX} onPress={()=>{navigation.navigate("Home")}}>
                <Icons name="times" size={20} color='black'></Icons>
            </TouchableOpacity>
        </View>
        </>
    )    
}