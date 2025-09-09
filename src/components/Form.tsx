import React from "react";
import Button from "./Button";

type FormProps = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    title: string;
    className?: string; 
    btnClassname?: string;
    labelClassName?: string; 
    inputClassName?: string;
}



const Form = ({onSubmit, value, name, onChange, title, className, btnClassname, labelClassName, inputClassName}: FormProps) => {
    return ( 
         <form onSubmit={onSubmit} className={className}>
                        <div>
                        <label htmlFor="name" className={labelClassName}>{title}</label>
                        <input type="text" name={name} value={value} onChange={onChange} className={inputClassName}/>

                        </div>
                        <Button type={'submit'} 
                            title={'Enter'}
                        className={btnClassname}/>
                    </form>
     );
}

export default Form;