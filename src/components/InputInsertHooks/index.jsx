import React, { useState } from 'react';

const Input = () => {
    return <input placeholder="Your input here" />;
};

export const DynamicInputTwo= () => {
    const [inputList, setInputList] = useState([]);

    const onAddBtnClick = () => {
        setInputList(inputList.concat(<Input key={inputList.length} />));
    };

    return (
        <div>
            <button type="button" onClick={onAddBtnClick}>Add input</button>
            {inputList}
        </div>
    );
}
const AddNew = ({ key, defaultValue, inputValues, count }) => {
    const swt = (i, val) => {
        inputValues[i] = val;
    };
    // console.log(inputValues)
    let i = count;
    return (
        <>
            <input
                type="text"
                name="teacherName"
                key={key}
                defaultValue={defaultValue}
                onBlur={e => {
                    swt((i += 1), e.target.value);
                }}
            />
        </>
    );
};
export const DynamicInput = () => {
    let count = 0;
    const [inputList, setInputList] = useState([]);
    const inputValues = [];
    const swt = (i, val) => {
        inputValues[i] = val;
    };
    const onAddBtnClick = () => {
        count += 2;
        setInputList(
            inputList.concat(
                <AddNew
                    key={inputList.length}
                    defaultValue=""
                    onChange={e => {
                        [e.target.name] = e.target.value;
                        swt(inputList.length + 2, e.target.value);
                    }}
                    inputValues={inputValues}
                    count={count}
                />
            )
        );
    };
    // console.log(inputList);
    return (
        <div className="App">
            <input type="text" onBlur={e => { swt(1, e.target.value) }} />
            <button type="button" onClick={onAddBtnClick}>Add input</button>
            {inputList}
        </div>
    );
}