import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontFamily: 'NotoSansThai-Bold',
    marginBottom: 8,
    marginTop: 16,
  },
  selector: {
    backgroundColor: '#f1f1f1',
    borderRadius: 16,
    padding: 12,
    justifyContent: 'center',
    marginTop: 8,
  },
  selectorText: {
    fontSize: 16,
    fontFamily: 'NotoSansThai-Regular',
    color: '#333',
  },
  textInput: {
    width: '100%',
    fontSize: 18,
    color: '#333',
    fontFamily: 'NotoSansThai-Regular',
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cardContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    maxHeight: '70%',
    overflow: 'hidden',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'NotoSansThai-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: 'NotoSansThai-Regular',
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
