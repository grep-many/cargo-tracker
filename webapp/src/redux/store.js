import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from './slices/shipmentsSlice'

const store = configureStore({
    reducer: {
        shipments: shipmentReducer
    },
    devTools: import.meta.env.MODE === "development",
});

export default store;