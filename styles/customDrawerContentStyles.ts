import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 24,
    marginTop: 16,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  buttonSelected: {
    backgroundColor: '#D84A34',
  },
  buttonText: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 14,
    color: '#000',
  },
  selectedText: {
    color: '#fff',
  },
  icon: {
    marginRight: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
    marginHorizontal: 4,
  },
});
