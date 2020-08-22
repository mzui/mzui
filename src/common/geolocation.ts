import { Plugins } from '@capacitor/core';

const { Geolocation, Network  } = Plugins;

class Geolocation1 {
  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
    return coordinates;
  }

  watchPosition(callback) {
    const wait = Geolocation.watchPosition({}, (position, err) => callback(position, err));
  }

  async getNetworkStatus(){
    let status = await Network.getStatus();
    console.log(">>>>>net");
    return status;
  }
}
Network.addListener('networkStatusChange', (status) => {
    console.log("Network status changed", status);
  });
export default new Geolocation1();
