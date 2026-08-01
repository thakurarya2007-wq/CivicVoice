from geopy.geocoders import Nominatim


class GeoCoder:

    geolocator = Nominatim(
        user_agent="civicvoice-ai",
        timeout=10,
    )

    @staticmethod
    def get_coordinates(location: str):

        try:
            result = GeoCoder.geolocator.geocode(
                query=location,
                exactly_one=True,
            )

            if result:
                return {
                    "latitude": result.latitude,
                    "longitude": result.longitude,
                }

        except Exception as e:
            print("Geocoder Error:", e)

        return {
            "latitude": None,
            "longitude": None,
        }