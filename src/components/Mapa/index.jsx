import React,{useState, useEffect} from 'react';
import { View , Text,TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native';
import MapView,{Marker,PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import MiniAlerta from "../CardMiniAlerta";
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAD from 'react-native-vector-icons/AntDesign';
import IconFA5 from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./styles"
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import Alerta from "../DetallesAlerta";
import TiposAlertaMapa from "./tiposAlertaMapa";
import mapStyle from "../../json/map_sim.json";
import departamentos from "../../json/depatamentosUbb.json";
import departamentoSiluetas from "../../json/departamentosSiluetas.json";
import * as geolib from 'geolib';
import  coordenadasUbb  from "../../json/coordenadasUbb";
import {Toilet} from 'phosphor-react-native'
import { VenetianMask, Warehouse,AlignLeft,LocateFixed,GraduationCap, Pencil, Shapes, HardHat, Presentation, Utensils, Frame, Lightbulb, BookMarked, FlaskConical, Users2, DoorOpen, Dumbbell, LayoutGrid, Hammer, BookCopy, Recycle, Building } from 'lucide-react-native';

export default function Mapa({handlePressButtons, socket, setIsVisibleTipoAlertas, verTipoAlertas, navigation}) {

    //const [isVisibleAlerta, setIsVisibleAlerta] = useState(false);
    const [coordenadasAlerta, setCoordenadasAlerta] = useState(null);
    const [marker, setMarker] = useState(null);
    const [coordenadasUsuario, setCoordenadasUsuario] = useState(null);
    const [coordenadasUsuarioA, setCoordenadasUsuarioA] = useState(null);
    const [verAlerta, setVerAlerta] = useState(false);
    const [alertaSeleccionada, setAlertaSeleccionada] = useState(null);
    const [alertas, setAlertas] = useState(null);
    const [likesAlertas, setLikesAlertas] = useState(null);
    const alertasRedux = useSelector(state => state.alertas.alertas)
    const notificacionRedux = useSelector(state => state.notificacion.notificacion)
    const usuarioRedux = useSelector(state => state.usuario)
    const likesAlertaRedux = useSelector(state => state.likesAlerta.usuarios)
    const dimensionesPantalla = Dimensions.get('window');
    const [initialRegion, setInitialRegion] = useState({
        latitude: -36.82292251647777,   
        longitude: -73.01327741968053,        
        latitudeDelta: 0.001,          
        longitudeDelta: 0.002,          
    }) 
    const map = (false)
    let cont = 0

    useEffect(() => {
        if(usuarioRedux.coordenadas !== null){
            //console.log(usuarioRedux.coordenadas);
            setCoordenadasUsuario(usuarioRedux.coordenadas);
           //console.log(usuarioRedux.coordenadas.coords.latitude);
            /* setInitialRegion({latitude: usuarioRedux.coordenadas.coords.latitude, 
                longitude: usuarioRedux.coordenadas.coords.longitude});  */

        }

    }, [usuarioRedux.coordenadas])


    useEffect(() => {
        if(likesAlertaRedux !== null){
          setLikesAlertas(likesAlertaRedux);
        }else{
          setLikesAlertas(null);
        }
      }, [likesAlertaRedux,alertasRedux])
        
    useEffect(() => {
        if(alertasRedux !== null){
            setAlertas(alertasRedux);
           
        }else{
            setAlertas(null);
        }
    }, [alertasRedux])

    useEffect(() => {

        if(notificacionRedux !== null && notificacionRedux !== undefined && usuarioRedux.notificaciones !== false){
           /* let mostrarNotificacion = geolib.isPointWithinRadius({latitude: notificacionRedux.latitude, longitude: notificacionRedux.longitude}, 
                {latitude: -36.82238193190107, longitude: -73.01337695114863}, 100);  */
           let mostrarNotificacion = geolib.isPointWithinRadius({latitude: notificacionRedux.latitude, longitude: notificacionRedux.longitude}, 
                    {latitude: coordenadasUsuario.coords.latitude, longitude: coordenadasUsuario.coords.longitude}, 100); 
                //console.log(mostrarNotificacion);
            if(mostrarNotificacion){
                console.log(usuarioRedux);
                Toast.show({
                    type: 'info',
                    position: 'top',
                    text1: 'Fue creada una alerta cerca de tu ubicación',
                    visibilityTime: 3000,
                });
            }
        }
       
    }, [notificacionRedux])

    const handleNewMarker = (coordinate) => {
        setMarker(coordinate);
        console.log(marker);
    };
    
    useEffect(() => {
      setCoordenadasAlerta(initialRegion);
      //console.log(initialRegion);
    }, [])
    

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
        setAlertaSeleccionada(alerta);
        setVerAlerta(true);      
    }


    const mostrarUsuario = (event) => {
        setInitialRegion(
            {  
                latitude: event.latitude,
                longitude: event.longitude, 
                latitudeDelta: 0.001,  
                longitudeDelta: 0.002,  
        
            }
        )       
    }

    const centrarMapa = (event) => {
        const lat = event.latitude 
        const long = event.longitude
        if (geolib.isPointInPolygon({lat, long}, coordenadasUbb.coordenadas) === false) {
            console.log(lat) 
            console.log(long) 
            setInitialRegion({
                latitude: -36.82292251647777,  
                longitude: -73.01327741968053,        
                latitudeDelta: 0.001,       
                longitudeDelta: 0.002,
            })
        }
    }

    const UsuarioA = (event) => {
        
        setCoordenadasUsuarioA(
            {
                
                latitude: event.latitude,
                longitude: event.longitude,   
        
            }
        )   
    }

    return (
        <>

       {verAlerta ? (
            <Alerta map={map} setIsVisibleAlerta={setVerAlerta} socket={socket} verAlerta={alertaSeleccionada} permisos={true} todosLosLikes={likesAlertas}/>
        ) : (null)} 

        {
            verTipoAlertas ? (<TiposAlertaMapa setVerTiposAlertas={setIsVisibleTipoAlertas} />):(null)
        }
         <View style={styles.container}>
             <MapView 
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}
                region={initialRegion}  
                style={styles.mapa}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={false}
                onUserLocationChange={(event)=>UsuarioA(event.nativeEvent.coordinate)}
                //onRegionChangeComplete={(e)=>{centrarMapa(e)}} 
                moveOnMarkerPress={false}
                rotateEnabled={false}
                customMapStyle={mapStyle}
                zoomTapEnabled={false}
                showsBuildings={false}
                minZoomLevel={17}
            >
              
              { alertas !== null ? (
                    alertas.map((alerta, i) => (
                        alerta.activa === true ? (  
                            
                            <Marker
                                key={i}
                                coordinate={{
                                    latitude: alerta.latitude ,
                                    longitude: alerta.longitude
                                }}
                                onPress={()=>{mostrarAlerta(alerta)}} 
                            > 
                                {/* <Text style={{position: "absolute"}}> </Text> */}
                                {pinTipoAlerta(alerta.tipo)} 
                            </Marker>
                        ):(null)  
                        
                    )
                )):(null)

              }  

              {
                departamentos.map((depa, i) => (
                    
                    <Marker
                        key={i}
                        title={depa.nombre}
                        coordinate={{
                            latitude: depa.latitud ,
                            longitude: depa.longitud
                        }}
                        onPress={(e)=> {handleNewMarker(e.nativeEvent.coordinate)}} 
                        opacity={0.5}
                        
                    >
                         
                        <Text style={{position: "absolute"}}> </Text>
                        
                        {
                            coordenadasAlerta !== null  ? (
                                coordenadasAlerta.longitudeDelta < 0.006 && coordenadasAlerta.latitudeDelta < 0.006  ? (
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
                                ) : (null)
                            ):(null)  
                                 
                        } 
                    </Marker>
                ))
              }
             {departamentoSiluetas.map((departamento, i) => (
                <Polygon 
                    key={i}
                    coordinates={departamento.coordenadas}
                    fillColor="rgba(0,0,0,0.1)"
                    strokeColor="rgba(0,0,0,0.1)"
               
                />
              ))
            }

            {/* {
                <Polygon 
                    coordinates={coordenadasUbb.coordenadas}
                    fillColor="rgba(0,0,0,0.1)"
                    strokeColor="rgba(0,0,0,0.1)"
                />
                
            } */}
            </MapView>

            <TouchableOpacity style={styles.botonMenu} onPress={()=>{navigation.navigate("Menu")}}>
                <AlignLeft size={25} color="#1C405F"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonUser} onPress={()=>{mostrarUsuario(coordenadasUsuarioA)}}>
                <LocateFixed size={28} color="#1C405F"/> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonPregunta} onPress={()=>setIsVisibleTipoAlertas(true)} >
                <IconAD 
                    name="question"
                    size={38}
                    color="#1C405F"
                />
            </TouchableOpacity> 
            
            <Animatable.View animation='fadeInUpBig' delay={500} style={styles.botonPlusPantallaGrand}>
                <TouchableOpacity style={styles.botonPlusPantallaPeque} onPress={()=>{navigation.navigate("Alerta")}}> 
                    <Ico
                        name="plus"
                        color="#ffffff"
                        size= {40}
                    />
                </TouchableOpacity> 
                <ScrollView style={{width: '100%',position: 'relative', }}> 
                    {alertas !== null ? (              
                        alertas.map((alerta,i) => (
                            alerta.activa === true && cont < 3? 
                                i!==0 && alerta.id === alertas[i-1].id ?
                                    (null)
                                : <MiniAlerta alerta={alerta} setVerAlerta={setAlertaSeleccionada} setAlertaSeleccionada={setVerAlerta} key={i} i={i}>{cont=cont+1}</MiniAlerta>             
                            :(null) 
                        )) 
                    ):(
                        <View style={{width: '100%',position: 'relative', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 17}}>No se encontraron alertas</Text>
                        </View>
                    )}     
                </ScrollView>
                <View style={{width: '100%',paddingTop:'3%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 14, }}>Más alertas</Text>
                </View>
                <View style={styles.containerBotones}> 
                       
                    <TouchableOpacity style={styles.containerBoton} onPress={()=>{handlePressButtons("noticias")}}>
                        <IconMCI
                            name="arrow-down"
                            color= "black"
                            size= {30}
                        />
                    </TouchableOpacity>
                </View> 
            </Animatable.View> 
        </View>
        </>
    )
}



