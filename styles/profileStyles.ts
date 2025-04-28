import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFB553',
  },
  appbar: {
    backgroundColor: '#EFB553',
    elevation: 0,
  },
  appbarTitle: {
    fontFamily: 'NotoSansThai-Bold',
    fontSize: 20,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 64,
    paddingTop: 80,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    top: -60,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'white',
    overflow: 'hidden',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
  },
  displayName: {
    fontFamily: 'NotoSansThai-Bold',
    fontSize: 22,
    color: '#555',
  },
  studentId: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
    color: '#777',
  },
  detailsContainer: {
    width: '90%',
  },
  detailRow: {
    marginBottom: 12,
  },
  detailLabel: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 14,
    color: '#555',
  },
  detailValue: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 16,
  },
  tabsContainer: {
    width: '100%',
    flex: 1,
  },
  tabLabel: {
    fontFamily: 'NotoSansThai-Regular',
    fontSize: 14,
  },
  tabBarStyle: {
    backgroundColor: '#ffffff',
    elevation: 0,
    borderBottomColor: '#ddd',
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  settingsIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
});
