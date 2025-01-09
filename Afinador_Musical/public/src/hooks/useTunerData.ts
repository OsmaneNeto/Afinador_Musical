import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TurnerData } from "../interface/turnerData";

const API_URL = "http://localhost:8081";

const fetchData = async (): Promise<TurnerData[]> => {
    const response = await axios.get<TurnerData[]>(API_URL + "/turner");
    console.log("Dados recebidos do backend:", response.data); // Log para verificar
    return response.data;
};

export function useTurnerData() {
    const query = useQuery<TurnerData[]>({
        queryFn: fetchData,
        queryKey: ["turnerData"],
        retry: 2,
        staleTime: 1000 * 60, // Cache por 1 minuto
    });

    return {
        ...query,
        data: query.data || [], // Retornar array vazio caso não haja dados
    };
}
