import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    
  /* containerRegistrar: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    zIndex: 2,
  },
  containerNav: {
    width: "100%",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },
  Registrar: {
    width: "100%",
    height: "100%",
  },
  containerInputsRegistro: {
    width: "100%",
    alignItems: "center",
    marginTop: hp(18),
  },
  containerTituloRegistro: {
    width: "100%",
    paddingLeft: wp(5.5),
  },
  tituloRegistro: {
    fontSize: 25,
  },
  containerTextoExplicativo: {
    width: "100%",
    marginTop: hp(1),
    paddingHorizontal: wp(5.5),
  },
  textoExplicativo: {
    fontSize: 16,
  },
  inputRegistro: {
    width: "88%",
    marginTop: hp(1.5),
  },
  containerError: {
    width: "100%",
    paddingLeft: wp(6),
  },
  textoError: {
    color: "red"
  },
  containerBotonRegistro: {
    width: "100%",
    alignItems: "center",
    marginTop: hp(4),
    marginBottom: hp(20),
  },
  botonRegistrar: {
    width: wp(55),
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
      height: 45,
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