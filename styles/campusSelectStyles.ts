import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 50,
    color: '#333',
    marginBottom: 20,
    fontFamily: 'NotoSansThai-Regular',
  },
  campusList: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%',
  },
  campusButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,  
    paddingHorizontal: 15,
    margin: 5, 
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,  
    borderColor: '#ddd',  
  },
  campusButtonText: {
    color: '#333',
    fontSize: 16, 
    fontWeight: '600',
    fontFamily: 'NotoSansThai-Regular',
  },
  modalHeader: {
    flexDirection: 'row',         
    alignItems: 'center',         
    justifyContent: 'flex-start', 
    padding: 10,                  
    backgroundColor: '#f1f1f1',   
  },
});


