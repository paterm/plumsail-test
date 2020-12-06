import ApiService from '@/services/api.service';
import { API_KEY, WHETHER_BASE, WHETHER_ICON_BASE } from '@/config';
import { TCard, TLocation } from '@/types';

class WhetherApiService extends ApiService {
  public get(city?: string, location?: TLocation) {
    type TOptions = {
      params: {
        lat?: number | string;
        lon?: number | string;
        q?: string;
        units?: string;
      };
    };

    const options: TOptions = { params: { ...location, units: 'metric' } };

    if (city) {
      options.params.q = city;
    }

    return this.fetch('/weather', options)
      .then((response): TCard | null => {
        if (response) {
          return {
            city: response.name,
            country: response.sys.country,
            feelsLike: response.main.feels_like,
            humidity: response.main.humidity,
            pressure: response.main.pressure,
            temp: response.main.temp,
            visibility: response.visibility,
            description: response.weather[0].description,
            icon: response.weather[0].icon,
            windDeg: response.wind.deg,
            windSpeed: response.wind.speed,
          };
        }

        return null;
      });
  }

  public getIcon(code: string): string {
    if (!code) return '';

    return `${WHETHER_ICON_BASE}${code}@2x.png`;
  }
}

export const WhetherService = new WhetherApiService({
  base: WHETHER_BASE,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  params: {
    appId: API_KEY,
  },
});
