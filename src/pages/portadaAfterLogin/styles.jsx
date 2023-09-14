import { StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    containerPortada: {
        backgroundColor: '#0140b1',
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    spinner: {
        //flex: 1,
        //marginTop: hp(30),
        marginBottom: hp(5)
    },
    textoCargando: {
        color: "white",
        fontSize: wp(5),
        
    },
    containerTituloAlerta: {
        alignItems: "center",
        marginTop: hp(2),
        
    },
    tituloAlerta: {
        fontSize: wp(5),
    },
    containerTextoAlerta: {
        alignItems: "center",
    },
    textoAlerta:{
        fontSize: wp(3.5),
    },
    containerBotonAlerta: {
        justifyContent: "center",
    },
    textoBotonAlerta: {
        color: "#01579b"
    },
    text1:{
        color:'#ffffff',
        fontSize: 55,
        fontWeight: 'bold',
        marginBottom: '25%'
    },
    imegen:{
        width: '10%',
        height: '42%',
        marginHorizontal: '1%',
        padding:'6.5%'
        //marginTop: '1%'
    },
})

export default styles