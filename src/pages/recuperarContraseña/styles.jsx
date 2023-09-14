import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    /* containerRecuperarContraseña: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      },
      containerTitle: {
        width: "100%",
        marginBottom: hp(2),
      },
      title: {
          fontSize: wp(6),
          paddingLeft: wp(5.5)
      },
      containerTexto: {
        width: "100%",
      },
      texto: {
        fontSize: wp(4),
        paddingLeft: wp(5.5),
      },
      containerInputRecuperarCuenta: {
        width: "100%",
        marginTop: hp(22.5),
        alignItems: "center",
      },
      input: {
        marginTop: hp(1),
        width: wp(88),
      },
      containerBotonRecuperarCuenta: {
        width: "100%",
        alignItems: "center",
        marginTop: hp(5),
        marginBottom: hp(20),
      },
      botonRecuperar: {
        width: wp(55),
      },
      containerError: {
        width: "100%",
        paddingLeft: wp(6),
      },
      textoError: {
        color: "red"
      } */
      container: {
        flex:1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
      },
      text:{
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: "center",
        color: '#1c405f'
      },
      textInput:{
          height: 50,
          borderWidth: 1,
          borderColor: '#1c405f',
          marginHorizontal: '5%',
          marginVertical: '1%',
          borderRadius: 13,
          paddingLeft: "5%",
      }, 
      button:{
        width: 200,
        height: 50,
        backgroundColor: '#0140b1',
        alignSelf: "center",
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        margin:'1%'
      },
      containerError: {
        width: "100%",
        paddingLeft: wp(6),
      },
      textoError: {
        color: "red"
      },
})

export default styles;