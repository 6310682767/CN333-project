import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 50,
    color: '#333',
    marginBottom: 20,
    fontFamily: 'NotoSansThai-Regular',
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 32,
    backgroundColor: '#f1f1f1',
    fontSize: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    textAlign: 'center',
    textAlignVertical: 'center', 
    fontFamily: 'NotoSansThai-Regular', 
    borderWidth: 1,
    borderColor: '#ddd',
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
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'NotoSansThai-Regular', 
  },
});
