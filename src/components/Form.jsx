import Button from "./Button";

const Form = ({onSubmit, value, name, onChange, title, className, btnClassname, labelClassName, inputClassName}) => {
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