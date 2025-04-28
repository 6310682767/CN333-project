import { StyleSheet } from 'react-native';

const SettingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appbar: {
    backgroundColor: '#EFB553',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 56,
  },
  appbarCenter: {
    flex: 1,
    alignItems: 'center',
    marginRight: 48,
  },
  appbarTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'NotoSansThai-Bold',
  },
  content: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 18,
    fontFamily: 'NotoSansThai-Bold',
    marginBottom: 8,
    marginHorizontal: 12,
    color: '#555',
  },
  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 48, 
  },
  rowText: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'NotoSansThai-Regular',
    marginLeft: 18,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#D84A34',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontFamily: 'NotoSansThai-Bold',
    fontSize: 16,
  },
  tick: {
    fontSize: 18,
    color: '#999', 
    alignSelf: 'center', 
  },
});

export default SettingsStyles;