import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllShipments,
    createShipment,
    updateShipment,
} from "@/api/shipments";

// Fetch all shipments
export const fetchShipments = createAsyncThunk(
    "shipments/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllShipments();
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Add shipment
export const addShipment = createAsyncThunk(
    "shipments/add",
    async (shipmentData, { rejectWithValue }) => {
        try {
            const response = await createShipment(shipmentData);
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Update shipment
export const editShipment = createAsyncThunk(
  "shipments/update",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      // Calls the new single endpoint
      const response = await updateShipment(id, updateData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const shipmentsSlice = createSlice({
    name: "shipments",
    initialState: {
        shipments: [],
        loading: false,
        error: null,
        search: "",
        filter: "All",
    },
    reducers: {
        setSearch: (state, action) => { state.search = action.payload; },
        setFilter: (state, action) => { state.filter = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchShipments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchShipments.fulfilled, (state, action) => {
                state.loading = false;
                state.shipments = action.payload;
            })
            .addCase(fetchShipments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addShipment.fulfilled, (state, action) => {
                state.shipments.push(action.payload);
            })
            .addCase(editShipment.fulfilled, (state, action) => {
                const index = state.shipments.findIndex((s) => s._id === action.payload._id);
                if (index !== -1) state.shipments[index] = action.payload;
            })
    },
});

export const { setSearch, setFilter } = shipmentsSlice.actions;

// Optional selector to get filtered shipments
export const selectFilteredShipments = (state) => {
    const { shipments, search, filter } = state.shipments;
    return shipments.filter((s) => {
        const matchFilter = filter === "All" || s.status === filter;
        const matchSearch = search
            ? [s.shipmentId, s.containerId, s.origin, s.destination, s.currentLocation]
                .some((val) => val.toLowerCase().includes(search.toLowerCase()))
            : true;
        return matchFilter && matchSearch;
    });
};

export default shipmentsSlice.reducer;
