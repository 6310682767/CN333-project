// src/styles/loginStyles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: height * 0.1,
  },
  logo: {
    width: 208,
    height: 155,
    resizeMode: 'contain',
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    backgroundColor: '#FEBD3F',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 32,
    width: '30%',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});