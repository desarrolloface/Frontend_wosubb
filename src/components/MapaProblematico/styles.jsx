import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerMapa: {
        position: "absolute",
        backgroundColor: 'white',
        zIndex: 8,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: hp(105),
    },
    mapa: {
        width: "100%",
        height: "100%"
    }, 
    botonMenu: {
        position: "absolute",
        width: 50,
        height: 50,
        top: hp(4),
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
    boton: {
        position: "absolute",
        top: hp(2),
        left: wp(5),
        padding: 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 100,
        opacity: 0.4,
        zIndex: 3 
    },
    botonX: {
        position: "absolute",
        width: 50,
        height: 50,
        top: hp(4),
        //marginLeft: wp(80),
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
        right: wp(2),
        zIndex: 2 
    },
    pinCalor: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "red",
    }
})

export default styles