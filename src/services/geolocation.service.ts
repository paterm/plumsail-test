export const GeolocationService = {
  getCurrentPosition(): Promise<Position> {
    return new Promise((resolve: () => void, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('No navigator.geolocation'));
      }
    });
  },
};
