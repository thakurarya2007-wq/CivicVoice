from app.ai.geocoder import GeoCoder

locations = [
    "India Gate, New Delhi, India",
    "Connaught Place, New Delhi, India",
    "Lucknow, Uttar Pradesh, India",
    "Mumbai, Maharashtra, India",
    "Taj Mahal, Agra, India",
]

for location in locations:
    coordinates = GeoCoder.get_coordinates(location)

    print("-" * 50)
    print("Location :", location)
    print("Latitude :", coordinates["latitude"])
    print("Longitude:", coordinates["longitude"])