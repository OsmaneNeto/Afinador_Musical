import "../modal/create-modal.css";
import { useTurnerData } from "../hooks/useTunerData";
import { TurnerData } from "../interface/turnerData";
import React from "react"

interface InputProps {
    label: string;
    value: string | number;
    updateValue: (value: any) => void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <div>
            <label>{label}</label>
            <input
                className="input-field"
                value={value}
                onChange={(e) =>
                    updateValue(
                        label === "Price"
                            ? parseFloat(e.target.value)
                            : e.target.value
                    )
                }
                type={label === "Price" ? "number" : "text"}
            />
        </div>
    );
};

export function CreateModal() {
    const { data, isLoading, error } = useTurnerData();

    if (isLoading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar os dados</div>;

    return (
        <div className="modal">
            {data?.map((item: TurnerData) => (
                <Input
                    key={item.title.toString()} // Garantir que seja uma string para evitar erros
                    label={item.title}
                    value={item.frequencia || ""}
                    updateValue={() => {}} // Aqui você pode implementar a lógica real
                />
            ))}
        </div>
    );
}
