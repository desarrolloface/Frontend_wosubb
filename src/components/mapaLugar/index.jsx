import React,{useState, useEffect} from 'react';
import { View , Text,TouchableOpacity, Dimensions} from 'react-native';
import MapView,{Marker,PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import IconFA5 from 'react-native-vector-icons/FontAwesome';
import styles from "./styles"
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import mapStyle from "../../json/map_sim.json";
import departamentos from "../../json/depatamentosUbb.json";
import departamentoSiluetas from "../../json/departamentosSiluetas.json";
import * as geolib from 'geolib';
import  coordenadasUbb  from "../../json/coordenadasUbb";
import Icons from '@expo/vector-icons/FontAwesome5'; 
import {Toilet} from 'phosphor-react-native'
import { VenetianMask, Warehouse, LocateFixed, MapPin, GraduationCap, Pencil, Shapes, HardHat, Presentation, Utensils, Frame, Lightbulb, BookMarked, FlaskConical, Users2, DoorOpen, Dumbbell, LayoutGrid, Hammer, BookCopy, Recycle, Building } from 'lucide-react-native';

export default function LugarMapa({setisMapaOpen, coordenadasAlerta, setCoordenadasAlerta, ubicacion, setUbicacion, navigation }) {

    //const [isVisibleAlerta, setIsVisibleAlerta] = useState(false);
    const [coordenadasUsuarioA, setCoordenadasUsuarioA] = useState(null);
    const [coordenadasUsuario, setCoordenadasUsuario] = useState(null);
    const [modalAvisoAlerta, setModalAvisoAlerta] = useState(false);
    const [alertas, setAlertas] = useState(null);
    const alertasRedux = useSelector(state => state.alertas.alertas)
    const notificacionRedux = useSelector(state => state.notificacion.notificacion)
    const usuarioRedux = useSelector(state => state.usuario)
    const dimensionesPantalla = Dimensions.get('window');
    const [initialRegion, setInitialRegion] = useState({
        latitude: -36.82292251647777,
        longitude: -73.01327741968053,  
        latitudeDelta: 0.001,     
        longitudeDelta: 0.002,  

    }) 

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
                /* console.log(usuarioRedux); */
                Toast.show({
                    type: 'info',
                    position: 'top',
                    text1: 'Fue creada una alerta cerca de tu ubicación',
                    visibilityTime: 3000,
                });
            }
        }
       
    }, [notificacionRedux])
   
    useEffect(() => {
      setCoordenadasAlerta(initialRegion);
    }, [])
 
    const handleClickMap = async () => {
        
        if(usuarioSeEncuentraEnUbb()){
             if(soloAlertasDentroDeUbb()){
                 setModalAvisoAlerta(true);
                 let encontreAlerta = false;
                 if(coordenadasAlerta === null){
                     if(alertasRedux !== null){
                         for(let i = 0; i < alertasRedux.length; i++){
                             if(alertasRedux[i].latitude === initialRegion.latitude && alertasRedux[i].longitude === initialRegion.longitude){ 
                                 encontreAlerta = true;
                                 break;
                             }
                         }
             
                         if(!encontreAlerta){
                             setCoordenadasAlerta(initialRegion);
                             verSiAlertaSeEncuentraEnDepartamento();
                             setisMapaOpen(!setisMapaOpen);
                         }
                     }else{
                 
                         setCoordenadasAlerta(initialRegion);
                         verSiAlertaSeEncuentraEnDepartamento();
                         setisMapaOpen(!setisMapaOpen);
                     }
         
                 }else{
                     
                     verSiAlertaSeEncuentraEnDepartamento();
                     setisMapaOpen(!setisMapaOpen);
                 }
             }else{
                 Toast.show({
                     type: 'error',
                     position: 'top',
                     text1: 'Solo puedes crear alertas dentro de la UBB',
                     visibilityTime: 3000,
                 })
             }
             
        }else{

         Toast.show({
             type: 'error',
             position: 'top',
             text1: 'Solo puedes crear alertas estando dentro de la UBB',
             visibilityTime: 3000,
         })
        } 
     
 }

    const verSiAlertaSeEncuentraEnDepartamento = () => {
       
        let seEncontro = false;
        let nombreDepa = null;
        
        for(let i = 0; i < departamentoSiluetas.length; i++){
            if( geolib.isPointInPolygon({ latitude: coordenadasAlerta.latitude, longitude: coordenadasAlerta.longitude }, departamentoSiluetas[i].coordenadas)){
                seEncontro = true;
                nombreDepa = departamentoSiluetas[i].nombre;
                /* console.log(coordenadasAlerta.latitude) */
                break;
            }
        }
       if(seEncontro){
            setUbicacion(nombreDepa);
       }else{
            setUbicacion("Exterior");
       }
    
    }

    const usuarioSeEncuentraEnUbb = () => {
        let seEncuentraDentro = geolib.isPointInPolygon({ latitude: -36.82238193190107, longitude: -73.01337695114863 }, coordenadasUbb.coordenadas)
        return seEncuentraDentro;
    }

    const soloAlertasDentroDeUbb = () => {
        let seEncuentraDentro = geolib.isPointInPolygon({ latitude: coordenadasAlerta.latitude, longitude: coordenadasAlerta.longitude }, coordenadasUbb.coordenadas)
        return seEncuentraDentro;
    }

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
        {/* {isVisibleModal ? (
            <CrearAlerta setIsVisibleModal={setIsVisibleModal} socket={socket} coordenadasAlerta={coordenadasAlerta} ubicacion={ubicacion}/>
         ):(null)}  */}

       {/* {verAlerta ? (
            <Alerta setIsVisibleAlerta={setVerAlerta} socket={socket} verAlerta={alertaSeleccionada} permisos={true} />
        ) : (null)}  */} 

        
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}  
                region={initialRegion} 
                style={styles.mapa}
                onRegionChangeComplete={(e)=> {setCoordenadasAlerta(e), console.log(e)}}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={false}
                onUserLocationChange={(event)=>UsuarioA(event.nativeEvent.coordinate)}
                tracksViewChanges={false}
                moveOnMarkerPress={false}
                rotateEnabled={false}
                customMapStyle={mapStyle}
                zoomTapEnabled={false}
                showsBuildings={false}
                minZoomLevel={18}
            >
              
              { alertas !== null ? (
                    alertas.map((alerta, i) => (
                        alerta.activa === true ? ( 
                            <Marker
                                key={i}
                                tracksViewChanges={false}
                                coordinate={{
                                    latitude: alerta.latitude ,
                                    longitude: alerta.longitude
                                }}
                                /* onPress={()=>{mostrarAlerta(alerta)}}  */
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
                        /* onPress={(e)=> {handleNewMarker(e.nativeEvent.coordinate)}}  */
                        opacity={0.5}
                        
                    >
                         
                        <Text style={{position: "absolute"}}> </Text> 
                        
                        {
                            coordenadasAlerta !== null  ? (
                                coordenadasAlerta.longitudeDelta < 0.01 && coordenadasAlerta.latitudeDelta < 0.01  ? (
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

           {/*  {
                    <Polygon 
                        coordinates={coordenadasUbb.coordenadas}
                        fillColor="rgba(0,0,0,0.1)"
                        strokeColor="rgba(0,0,0,0.1)"
                    />
                
            } */}

            </MapView>
            
            <View style={styles.makerMapa}><MapPin size={32} color='red'></MapPin></View>
                

            <TouchableOpacity style={styles.botonMenu} onPress={()=>{setisMapaOpen(false)}}>
                <Icons name="chevron-left" size={20} color='black'></Icons>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonX} onPress={()=>{navigation.navigate("Home")}}>
                <Icons name="times" size={20} color='black'></Icons>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonUser} onPress={()=>{mostrarUsuario(coordenadasUsuarioA)}}>
                <LocateFixed size={25} color="#1C405F"/> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonListo} onPress={handleClickMap}>
                <Text style={{color: '#ffffff'}}>Listo</Text>
            </TouchableOpacity>             
        </View>
        </>
    )
}



