import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
  name: string;
  birthdate: string;
  city: string;
  vehiclePower: number;
  voucher: number;
  priceMatch: number;
  discounts: string[];
  coverages: string[];
}

const initialState: FormState = {
  name: '',
  birthdate: '',
  city: '',
  vehiclePower: 0,
  voucher: 0,
  priceMatch: 0,
  discounts: [],
  coverages: []
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setBirthDate(state, action: PayloadAction<string>) {
      state.birthdate = action.payload
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload
    },
    setVehiclePower(state, action: PayloadAction<number>) {
      state.vehiclePower = action.payload
    },
    setVoucher(state, action: PayloadAction<number>) {
      state.voucher = action.payload
    },
    setPriceMatch(state, action: PayloadAction<number>) {
      state.priceMatch = action.payload
    },
    setDiscounts(state, action: PayloadAction<string[]>) {
      state.discounts = action.payload
    },
    setCoverages(state, action: PayloadAction<string[]>) {
      state.coverages = action.payload
    },
  }
});

export const { setName, setBirthDate, setCity, setVehiclePower, setVoucher, setPriceMatch, setDiscounts, setCoverages } = formSlice.actions;
export default formSlice.reducer;