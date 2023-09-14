import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerCamara: {
        width: wp(100),
        height: hp(105),
        backgroundColor: "black",
        zIndex: 20
    },

    containerBotonesCamara: {
        position: "absolute",
        top: hp(8),
        width: wp(100),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: hp(5),
        paddingHorizontal: wp(6),
        zIndex: 31
    },
    
    camera: {
        width: "100%",
    },
    containerImagen: {
        width: wp(100),
        height: hp(100),
        backgroundColor: "black ",
    },
    containerBotonSacarFoto: {
        position: "absolute",
        bottom: hp(10),
        width: "100%",
        justifyContent: "center",
        alignItems: "center",

    },
    botonSacarFoto: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        backgroundColor:'#ffffff'
    },
    containerBotonesFotoTomada: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: "12%",
        bottom: "10%"
    },
    botonFotoTomada: {
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        
    },
    botonMenu: {
        position: "absolute",
        width: 50,
        height: 50,
        //top: hp(1),
        //marginLeft: wp(3),
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
        padding: 1,
        left: wp(2),
        zIndex: 2 
    },
})

export default styles