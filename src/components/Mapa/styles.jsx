import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    mapa: {
        justifyContent: 'center',
        width: "100%",
        height: hp(100),
        zIndex: 1,
    },
    makerMapa: {
        position: "absolute",
        justifyContent: "center",
        top: hp(50),
        width: wp(17),
        zIndex: 2
    },
    botonUser: {
        position: "absolute",
        //top: hp(1),
        marginVertical: hp(36.5),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        padding: 10,
        right: wp(2),
        zIndex: 2 
    },
    botonPregunta: {
        position: "absolute",
        //top: hp(1),
        marginVertical: hp(45),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        padding: 4,
        right: wp(2),
        zIndex: 2 
    },
    botonMenu: {
        position: "absolute",
        //top: hp(1),
        marginVertical: hp(6.5),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "white",
        borderColor: "#E5E5E5",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        padding: 12,
        left: wp(2),
        zIndex: 2 
    },
    botonPlusPantallaGrand:{
        height: hp(44.7),
        //backgroundColor: "pink",
        width: '100%',
        position: "absolute",
        bottom: hp(0),
        padding: '3%',
        //justifyContent: "center",
        alignItems: "center",
        //borderRadius: 100,
        backgroundColor: "#ffffff",
        borderColor: "#E5E5E5",
        shadowColor: "#000",
        /* shadowOffset: {
            width: 0,
            height: 2,
        }, */
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        //elevation: 5,
        zIndex: 2,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
    botonPlusPantallaPeque:{
        //position: "absolute",
        bottom: hp(3),
        backgroundColor: '#0140b1',
        //justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        //backgroundColor: "black",
        padding: 12,
        shadowOpacity: 10,
        shadowRadius: 3.84,
        elevation: 8,
    },
    botonRuta: {
        position: "absolute",
        bottom: hp(16.5),
        width: 54,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor: "black",
        opacity: 0.4,
        height: 54,
        right: wp(5),
        zIndex: 2 
    },

    
    containerTitle: {
        width: "100%",
        justifyContent: "center",
        height: "100%",
    },
    title: {
        fontSize: wp(8),
        paddingTop: hp(2.5),
    },
    containerTiposAlertas: {
        position: "absolute",
        borderRadius: 50,
        bottom: hp(0),
        width: "100%",
        height: hp(45),
        backgroundColor: "white", 
        zIndex: 3, 
    //position: "absolute",
    //margin: 20,
   
    //zIndex: 3,
    },
    containerAlertas: {
        /* width: '100%',
        backgroundColor: 'white',
        borderRadius: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, */ 
        width: "100%",
        height: "70%", 
        //backgroundColor: "pink",
        //borderWidth: 2,
    },
    pinRepresentado: {
        marginTop: hp(2),
        marginLeft: wp(2),
        flexDirection: "row",
        alignItems: "center",
    },
    textTipoAlerta: {
        fontSize: wp(4.5),
    },
    containerPinDepartamentos: {
        alignItems: "center",
    },
    containerBotones: {
        //position: 'absolute',
        backgroundColor: "#ffffff",
        alignItems: "center",
        //marginTop: '60%',
        marginBottom: '15%',
        //paddingVertical: '3%',
        //borderTopWidth: 1,
        borderColor: "#E5E5E5",
        //bottom: hp(0),
        width: "100%",
        height: '0%',
        //flexDirection: "row",
        //justifyContent: "space-around",
        //zIndex: 6,
        //borderRadius: 50 
    },
    containerBoton: {
        borderRadius: 100,
        //bottom: hp(2),
        backgroundColor: "#bfcee6",
        paddingTop: hp(1),
        width: 45,
        height: 45,
        marginTop: "2%",
        alignItems: "center",
    },
     
    boton: {
        alignItems: "center",
        justifyContent: "center"
       
    },
    textBoton: {
        fontSize: 12, 
    },

})

export default styles