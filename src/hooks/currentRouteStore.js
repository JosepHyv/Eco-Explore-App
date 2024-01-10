import {create} from "zustand";


const useCurrentRouteStore = create((set) => ({
	ruta: {},
	setRuta: (ruta) => set(() => ({ruta}))
}));

export default useCurrentRouteStore;