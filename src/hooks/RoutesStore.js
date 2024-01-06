import {create} from "zustand";


const useRoutesStore = create((set) => ({
	ruta: [],
	cargando: false,
	error: false,
	setRuta: (nuevaData) => set(() => {
		if(typeof nuevaData === "object"){
			if(nuevaData.Rutas !== undefined)
				ruta = nuevaData.Rutas;
		}
	}),
	setError: (error) => set(() => ({error})),
	setCargand: (cargando) => set(({cargando}))
	// setUsuario: (usuario) => set(() => ({ usuario })),
}));

export default useRoutesStore;