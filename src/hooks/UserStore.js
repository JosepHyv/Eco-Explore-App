import {create} from "zustand";


const useUserStore = create((set) => ({
	usuario: {},
	setUsuario: (usuario) => set(() => ({ usuario })),
}));

export default useUserStore;