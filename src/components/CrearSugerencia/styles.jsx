import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
   containerModalSugerencia:{
        width: "100%",
        height: "100%",
        backgroundColor: "#0140b1",
        zIndex: 7,
   },
   modalSugerencia: {
       width: "100%",
       height: "100%",
   },
   
   containerTitle: {
    width: "100%",
    marginVertical: hp(4),
    alignItems: "center",
    },
    title: {
        fontSize: wp(7),
        color: '#ffffff'
    },
    containerTextoSugerencia: {
        width: "100%",
        marginTop: hp(2),
        paddingHorizontal: wp(5),
    },
    texto: {
        fontSize: wp(4),
        color: '#ffffff'
    },
    containerInput: {
        width: "100%",
        marginTop: hp(2),
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: "90%",
        height: 150,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#ffffff',
        marginHorizontal: '5%',
        marginVertical: '5%',
        borderRadius: 13,
        paddingLeft: "5%",
        color: '#ffffff',
    },
    containerError: {
        width: "100%",
        marginTop: hp(0.5),
        paddingLeft: wp(5.5),
    },
    textoError: {
        color: "red",
    },
    containerBotonEnviar: {
        flex:1,
        width: "100%",
        justifyContent: 'center',
        alignItems: "center",
        marginTop: hp(10),
        //marginBottom: hp(15),
        /* backgroundColor: "grey", */
    },
    botonEnviar: {
        width: "55%",
        height: 45,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 15
    },
    textoBotonEnviar: {
        fontSize: wp(3.5),
        color: "white",
    }
})

export default styles;