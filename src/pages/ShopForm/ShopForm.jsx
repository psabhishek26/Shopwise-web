import React, { useState } from "react";
import { MapPin, Plus, X, Image as ImageIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { ShopAction } from "../../actions";
import { ItemService } from "../../services";

const ShopForm = () => {
  const { userData } = useSelector((state) => state.generalState);
  const [shopDetails, setShopDetails] = useState({
    shopName: "",
    description: "",
    location: "",
    coordinates: { lat: "", lng: "" },
    isPublic: true,
    items: [],
  });
  const [items, setItems] = useState([
    { name: "", price: "", description: "", image: null, imagePreview: "" },
  ]);
  const [manualLocation, setManualLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const dispatch = useDispatch();

  const getCurrentLocation = () => {
    setLocationLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setShopDetails((prev) => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
          setLocationLoading(false);
        },
        (error) => {
          alert("Error getting location. Please enter manually.");
          setManualLocation(true);
          setLocationLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setManualLocation(true);
      setLocationLoading(false);
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", price: "", description: "", image: null, imagePreview: "" },
    ]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        alert("File is too large. Please choose an image under 5MB.");
        return;
      }

      handleItemChange(index, "image", file);
      handleItemChange(index, "imagePreview", URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const shopData = {
        ...shopDetails,
        userId: userData?.data?._id,
      };

      const shopResponse = await dispatch(ShopAction.addNewShop(shopData));
      const shopId = shopResponse?.data?._id;

      const itemPromises = items.map(async (item) => {
        const itemData = new FormData();
        itemData.append("name", item.name);
        itemData.append("price", item.price);
        itemData.append("description", item.description);
        itemData.append("shopId", shopId);

        if (item.image instanceof File) {
          itemData.append("image", item.image);
        }

        return ItemService.createItem(itemData);
      });

      const itemResponses = await Promise.all(itemPromises);
      const itemIds = itemResponses.map((response) => response.data.insertedId);

      const updateShopData = {
        items: itemIds,
      };
      dispatch(ShopAction.updateShop(shopId, updateShopData));

      alert("Shop and items saved successfully!");
      setShopDetails({
        shopName: "",
        description: "",
        location: "",
        coordinates: { lat: "", lng: "" },
        items: [],
      });
      setItems([
        { name: "", price: "", description: "", image: null, imagePreview: "" },
      ]);
    } catch (error) {
      console.error(error);
      alert("Error saving shop details: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8 border border-gray-700">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Shop Details
            </h1>
            <p className="text-gray-400">Enter your shop information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Shop Name
              </label>
              <input
                type="text"
                value={shopDetails.shopName}
                onChange={(e) =>
                  setShopDetails((prev) => ({
                    ...prev,
                    shopName: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-100"
                placeholder="Enter shop name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Description
              </label>
              <textarea
                value={shopDetails.description}
                onChange={(e) =>
                  setShopDetails((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-100 h-32"
                placeholder="Describe your shop"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Location
              </label>
              <div className="flex gap-4 items-start">
                <input
                  type="text"
                  value={shopDetails.location}
                  onChange={(e) =>
                    setShopDetails((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-100"
                  placeholder="Enter location address"
                  required
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-200 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  {locationLoading ? "Getting Location..." : "Get Location"}
                </button>
              </div>
            </div>

            {(manualLocation || shopDetails.coordinates.lat) && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={shopDetails.coordinates.lat}
                    onChange={(e) =>
                      setShopDetails((prev) => ({
                        ...prev,
                        coordinates: {
                          ...prev.coordinates,
                          lat: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-100"
                    placeholder="Enter latitude"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={shopDetails.coordinates.lng}
                    onChange={(e) =>
                      setShopDetails((prev) => ({
                        ...prev,
                        coordinates: {
                          ...prev.coordinates,
                          lng: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-100"
                    placeholder="Enter longitude"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300 block">
                  Items
                </label>
                <button
                  type="button"
                  onClick={addItem}
                  className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              {items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-700 rounded-lg space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-gray-300 font-medium">
                      Item {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-gray-400 hover:text-red-400 transition duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                      className="px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-100"
                      placeholder="Item name"
                      required
                    />
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", e.target.value)
                      }
                      className="px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-100"
                      placeholder="Price"
                      required
                    />
                    <div className="col-span-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                        className="w-full px-4 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-gray-100"
                        placeholder="Item description"
                        required
                      />
                    </div>

                    <div className="col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-300 block">
                        Item Image
                      </label>
                      <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-500 rounded-lg">
                        {item.imagePreview ? (
                          <div className="space-y-4 w-full">
                            <img
                              src={item.imagePreview}
                              alt={`Preview of ${item.name}`}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                handleItemChange(index, "image", "");
                                handleItemChange(index, "imagePreview", "");
                              }}
                              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                            >
                              Remove Image
                            </button>
                          </div>
                        ) : (
                          <label className="w-full cursor-pointer">
                            <div className="flex flex-col items-center justify-center py-6">
                              <ImageIcon className="w-12 h-12 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-400">
                                Click to upload image
                              </p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(index, e)}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Shop Details"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopForm;
