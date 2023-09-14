import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerAlerta: {
        width: "100%",
        height: "100%",
        backgroundColor: "#f2f5fb",
        zIndex: 9

    },
    alerta: {
        width: "100%",
        marginTop: hp(1.5),
        height: hp(86),
        backgroundColor:'#ffffff',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
    
    containerTituloAlerta: {
        width: "60%",
        paddingLeft: wp(5),
        marginTop: hp(4),
        
    },
    tituloAlerta: {
        fontSize: wp(4.5),
        fontWeight: "bold"

    },
    containerFecha: {
        width: "100%",
        flexDirection: "row",
        //paddingHorizontal: wp(5),
        marginTop: hp(0.5),
        paddingBottom: hp(2),
        borderBottomColor: "#E5E5E5",
        
        
    },
    fecha: {
        fontSize: wp(3),
        marginRight: wp(3)
    },
    containerDescripcion: {
        width: "100%",
        flexDirection: "column",
        marginTop: hp(1.5),
        paddingHorizontal: wp(5),
        maxHeight: 200
    },
    atributoAlerta: {
        fontSize: wp(3.5),
        fontWeight: "bold"
    },
    descripcion: {
        fontSize: wp(3.5)
    },
    containerUbicacion: {
        width: "80%",
        flexDirection: 'row',
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },
    ubicacion: {
        fontSize: wp(3.5),
        marginLeft: wp(2)
        
    },
    nombre: {
        
        fontSize: wp(3.5),
        fontWeight: "bold"
    },
    correo: {
        
        fontSize: wp(3)
    },
    containerDescripcionUbicacion: {
        width: "100%",
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },
    containerTituloImagen: {
        width: "100%",
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },  
    containerImagen: {
        marginTop: hp(2),
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        
    },
    contenedorSpinner: { 
        position: "absolute",
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagen: {
        width: wp(65),
        borderRadius: 10,
        //resizeMode: "contain",
        height: hp(65)
    },
    containerTextoImagen:{
        width: "100%",
        paddingLeft: wp(5),
        marginTop: hp(1),
    },
    textoImagenNoEncontrada: {
        fontSize: wp(4)
    },
    containerUsuario: {
        width: "100%",
        flexDirection: 'row-reverse',
        marginTop: hp(3),
        paddingHorizontal: wp(10),
    },
    textUsuario: {
        fontSize: wp(3.5)
    },
    BotonLikes: {
        position: "absolute",
        width: 50,
        height: 50,
        padding: '1.5%',
        //backgroundColor: "#ffffff",
        paddingTop: hp(1),
        marginBottom: hp(40),
        borderWidth: 1,
        marginLeft: wp(85),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        
        shadowColor: "black",
        shadowOpacity: 10,
        shadowRadius: 3.84,
        elevation: 3,
        bottom: 0
  
    },
    BotonLikesRed: {
        position: "absolute",
        width: 50,
        height: 50,
        padding: '1%',
        backgroundColor: "#ffffff",
        paddingTop: hp(1),
        marginBottom: hp(40),
        borderWidth: 1,
        marginLeft: wp(85),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E5E5E5",
        shadowColor: "black",
        shadowOpacity: 10,
        shadowRadius: 3.84,
        elevation: 3,
        bottom: 0
    },
    botonComentarios: {
        position: "absolute",
        width: 50,
        height: 50,
        padding: '1%',
        borderRadius: 100,
        paddingTop: hp(1),
        marginBottom: hp(30),
        //marginTop: hp(15),
        marginLeft: wp(85),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:'#ffffff',
        borderColor: "#E5E5E5",
        shadowColor: "black",
        shadowOpacity: 10,
        shadowRadius: 3.84,
        elevation: 3,
        bottom: 0
    },
    textoBotonComentarios: {
        fontSize: wp(3),
        color: "white"
    },
    containerTextoAlertaEliminar: {
        alignItems: "center",
        marginTop: hp(2),
    },
    textoAlertaEliminar: {
        fontSize: wp(4),
    },
    textoBotonAlerta: {
       color: "#01579b",
    },
    containerTextInputComentario: {
    
        //width: "100%", 
        //backgroundColor: "white",
        //paddingVertical: hp(2),
        justifyContent:'center',
        alignItems: 'center',
        //marginBottom: hp(10),
        //bottom: hp(10),
        flexDirection: "row", 
    },
    textInput: {
        width: wp(73),
        height: hp(7),
        marginLeft: wp(5),
        paddingLeft: wp(4),  
        backgroundColor: '#f2f5fb',
        borderRadius: 100,
    },
    containerBotonEnviar: {
        width: wp(18),
        height: "100%",
        justifyContent: "center"
       
    },
    botonEnviar: {
        width: 50,
        height: 50,
        marginLeft: wp(5),
        backgroundColor: '#01579b',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },
    textoBotonEnviar: {
        fontSize: wp(4)
    },
   
})

export default styles